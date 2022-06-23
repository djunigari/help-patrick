import publishContainer from "../PublishContainer";
import createContainer from "./CreateContainer";

interface ShareToFeedProps {
    accessToken: string
    instagramId: string
    imageUrl: string
    caption: string
}

export default async function shareToFeed({ instagramId, imageUrl, caption, accessToken }: ShareToFeedProps) {
    const containerId = await createContainer(accessToken, instagramId, imageUrl, caption)
    const mediaId = await publishContainer(instagramId, containerId, accessToken)
    return mediaId
}