import type {
  Blockquote,
  Code,
  Heading,
  Image,
  List,
  ListItem,
  Paragraph,
  PhrasingContent,
  RootContent,
} from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { gfm } from 'micromark-extension-gfm';

/**
 * Converts a markdown "richtext" value to a strapi "blocks" value (the json
 * the blocks editor stores), see @strapi/blocks-react-renderer for the shape.
 *
 * Markdown that blocks cannot represent (tables, html, horizontal rules…)
 * throws: the entry has to be fixed by hand rather than silently lose content.
 */

type Modifiers = Partial<
  Record<'bold' | 'italic' | 'strikethrough' | 'code', true>
>;
export type TextNode = { type: 'text'; text: string } & Modifiers;
export type LinkNode = { type: 'link'; url: string; children: TextNode[] };
type InlineNode = TextNode | LinkNode;
type ListNode = {
  type: 'list';
  format: 'ordered' | 'unordered';
  indentLevel: number;
  children: ({ type: 'list-item'; children: InlineNode[] } | ListNode)[];
};
export type BlockNode =
  | { type: 'paragraph'; children: InlineNode[] }
  | { type: 'heading'; level: Heading['depth']; children: InlineNode[] }
  | { type: 'quote'; children: InlineNode[] }
  | { type: 'code'; language?: string; children: TextNode[] }
  | { type: 'image'; image: unknown; children: [TextNode] }
  | ListNode;

/** Returns the media library file of an image url, null when unknown */
export type ResolveImage = (url: string) => Promise<unknown>;

/** Invisible characters pasted from word processors */
const ZERO_WIDTH = /[​﻿]/gu;

const emptyText = (): TextNode => ({ type: 'text', text: '' });

const isSameModifiers = (a: TextNode, b: TextNode) =>
  (['bold', 'italic', 'strikethrough', 'code'] as const).every(
    (m) => a[m] === b[m]
  );

/** Merges adjacent texts with the same modifiers, as the editor does */
const normalizeInline = (nodes: InlineNode[]): InlineNode[] => {
  const merged: InlineNode[] = [];
  for (const node of nodes) {
    const previous = merged.at(-1);
    if (
      node.type === 'text' &&
      previous?.type === 'text' &&
      isSameModifiers(previous, node)
    ) {
      previous.text += node.text;
    } else if (node.type !== 'text' || node.text !== '') {
      merged.push(node);
    }
  }
  // Leading/trailing line breaks are not visible in markdown
  const first = merged.at(0);
  if (first?.type === 'text') first.text = first.text.replace(/^\n+/u, '');
  const last = merged.at(-1);
  if (last?.type === 'text') last.text = last.text.replace(/\n+$/u, '');
  return merged.length > 0 ? merged : [emptyText()];
};

const unsupported = (type: string, line?: number): never => {
  throw new Error(
    `Unsupported markdown "${type}"${line ? ` at line ${line}` : ''}, convert it by hand`
  );
};

const toInline = (nodes: PhrasingContent[], modifiers: Modifiers = {}): InlineNode[] =>
  nodes.flatMap((node): InlineNode[] => {
    switch (node.type) {
      case 'text':
        return [{ type: 'text', text: node.value.replace(ZERO_WIDTH, ''), ...modifiers }];
      case 'strong':
        return toInline(node.children, { ...modifiers, bold: true });
      case 'emphasis':
        return toInline(node.children, { ...modifiers, italic: true });
      case 'delete':
        return toInline(node.children, { ...modifiers, strikethrough: true });
      case 'inlineCode':
        return [{ type: 'text', text: node.value, ...modifiers, code: true }];
      case 'break':
        return [{ type: 'text', text: '\n', ...modifiers }];
      case 'link': {
        const children = toInline(node.children, modifiers).filter(
          (child): child is TextNode => child.type === 'text'
        );
        return [{ type: 'link', url: node.url, children: children.length > 0 ? children : [emptyText()] }];
      }
      default:
        return unsupported(node.type, node.position?.start.line);
    }
  });

const toImage = async (node: Image, resolveImage: ResolveImage): Promise<BlockNode> => {
  const image = await resolveImage(node.url);
  if (image === null) {
    throw new Error(`Image ${node.url} is not in the media library`);
  }
  return { type: 'image', image, children: [emptyText()] };
};

/** Blocks images are blocks: a paragraph is split around its images */
const fromParagraph = async (node: Paragraph, resolveImage: ResolveImage): Promise<BlockNode[]> => {
  const blocks: BlockNode[] = [];
  let pending: PhrasingContent[] = [];
  const flush = () => {
    const children = normalizeInline(toInline(pending));
    const isEmpty = children.length === 1 && children[0].type === 'text' && children[0].text.trim() === '';
    if (!isEmpty) blocks.push({ type: 'paragraph', children });
    pending = [];
  };
  for (const child of node.children) {
    if (child.type === 'image') {
      flush();
      blocks.push(await toImage(child, resolveImage));
    } else {
      pending.push(child);
    }
  }
  flush();
  return blocks;
};

const fromList = (node: List, indentLevel: number): ListNode => ({
  type: 'list',
  format: node.ordered ? 'ordered' : 'unordered',
  indentLevel,
  children: node.children.flatMap((item: ListItem) =>
    item.children.flatMap((child): ListNode['children'] => {
      if (child.type === 'paragraph') {
        return [{ type: 'list-item' as const, children: normalizeInline(toInline(child.children)) }];
      }
      if (child.type === 'list') {
        return [fromList(child, indentLevel + 1)];
      }
      return unsupported(`${child.type} in a list item`, child.position?.start.line);
    })
  ),
});

/** Blocks quotes only hold inline content: paragraphs become line breaks */
const fromQuote = (node: Blockquote): BlockNode => {
  const inline = node.children.flatMap((child, index) => {
    if (child.type !== 'paragraph') {
      return unsupported(`${child.type} in a quote`, child.position?.start.line);
    }
    const separator: InlineNode[] = index > 0 ? [{ type: 'text', text: '\n\n' }] : [];
    return [...separator, ...toInline(child.children)];
  });
  return { type: 'quote', children: normalizeInline(inline) };
};

const fromCode = (node: Code): BlockNode => ({
  type: 'code',
  ...(node.lang ? { language: node.lang } : {}),
  children: [{ type: 'text', text: node.value }],
});

const fromBlock = async (node: RootContent, resolveImage: ResolveImage): Promise<BlockNode[]> => {
  switch (node.type) {
    case 'paragraph':
      return fromParagraph(node, resolveImage);
    case 'heading':
      return [{ type: 'heading', level: node.depth, children: normalizeInline(toInline(node.children)) }];
    case 'list':
      return [fromList(node, 0)];
    case 'blockquote':
      return [fromQuote(node)];
    case 'code':
      return [fromCode(node)];
    default:
      return unsupported(node.type, node.position?.start.line);
  }
};

export const markdownToBlocks = async (
  markdown: string,
  resolveImage: ResolveImage
): Promise<BlockNode[]> => {
  const tree = fromMarkdown(markdown, {
    extensions: [gfm()],
    mdastExtensions: [gfmFromMarkdown()],
  });
  const blocks: BlockNode[] = [];
  for (const node of tree.children) {
    blocks.push(...(await fromBlock(node, resolveImage)));
  }
  return blocks;
};
