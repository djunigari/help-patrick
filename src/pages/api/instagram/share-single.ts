import getAccessToken from '@backend/repositories/GetAccessToken';
import getInstagramId from '@backend/repositories/GetInstagramId';
import ShareToFeed from '@backend/services/instagram/SingleMedia/ShareToFeed';
import getInstagramBusinessAccountId from 'backend/services/instagram/GetInstagramBusinessAccountId';
import { auth } from 'backend/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    const accessToken = await getAccessToken(uid)
    const instagramId = await getInstagramId(uid)
    const { imageUrl, caption } = req.body
    const mediaId = await ShareToFeed(accessToken, instagramId, imageUrl, caption)
    res.status(200).json(mediaId)
}

