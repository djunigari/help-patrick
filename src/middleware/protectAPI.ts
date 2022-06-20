import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// Add Cors in future feature 
const protectAPI = (handler: NextApiHandler) => {
    return async (
        req: NextApiRequest,
        res: NextApiResponse
    ) => {
        if (!req.headers.referer || new URL(req.headers.referer).origin !== process.env.NEXT_PUBLIC_URL) {
            return res.status(403).json({ success: false, message: `Forbidden` })
        }
        return handler(req, res)
    }
}

export default protectAPI;