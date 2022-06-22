import { facebookUrl } from "@backend/utils/FacebookUtils";
import publishContainer from "../PublishContainer";
import createContainer from "./CreateContainer";

export default async function ShareToFeed(accessToken: string, instagramId: string, imageUrl: string, caption: string) {
    const containerId = await createContainer(accessToken, instagramId, imageUrl, caption)
    const mediaId = await publishContainer(instagramId, containerId, accessToken)
    return mediaId
}