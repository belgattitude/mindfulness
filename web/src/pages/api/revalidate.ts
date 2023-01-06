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
  console.log('revalidate.body', req.body);
  console.log('revalidate.query', req.query);
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
