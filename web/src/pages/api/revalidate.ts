import type { NextApiRequest, NextApiResponse } from 'next';

type Response =
  | {
      revalidated: true;
    }
  | {
      revalidated: false;
      message: string;
    };

export default async function revalidateHandler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  console.log('revalidate.headers', req.headers);
  console.log('revalidate.body', req.body);
  console.log('revalidate.query', req.query);
  /**
   * revalidate.body {
   *   event: 'entry.create',
   *   createdAt: '2023-01-06T23:36:53.633Z',
   *   model: 'event-type',
   *   entry: {
   *     id: 5,
   *     title: 'test',
   *     slug: 'test',
   *     createdAt: '2023-01-06T23:36:53.624Z',
   *     updatedAt: '2023-01-06T23:36:53.624Z',
   *     locale: 'fr',
   *     localizations: []
   *   }
   * }
   */
  try {
    await res.revalidate(`/events`);
    return res.json({ revalidated: true });
  } catch (e) {
    return res.status(500).json({
      revalidated: false,
      message: `Revalidation failed: ${(e as Error).message}`,
    });
  }
}
