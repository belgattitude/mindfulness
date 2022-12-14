import createEmotionServer from '@emotion/server/create-instance';
import type { DocumentProps } from 'next/document';
import Document, { Html, Main, Head, NextScript } from 'next/document';
import { createEmotionCache } from '@/lib/emotion/createEmotionCache';

type Props = DocumentProps & {
  emotionStyleTags: string[];
};

class MyDocument extends Document<Props> {
  render() {
    const locale = 'fr';
    return (
      <Html lang={locale}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="emotion-insertion-point" content="" />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Remove this method if not needed. Allows emotion to output the inlined css at insertion point (head)
// only useful when you need some way to override theme/styles (ie: using mui, mantine, chakra...).
MyDocument.getInitialProps = async (ctx) => {
  if (!ctx.req) {
    return ctx.defaultGetInitialProps(ctx);
  }
  const originalRenderPage = ctx.renderPage;
  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));
  return {
    ...initialProps,
    emotionStyleTags,
  };
};
export default MyDocument;
