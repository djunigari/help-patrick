import publishContainer from "../PublishContainer"
import CreateCarouselContainer from "./CreateCarouselContainer"
import createItemContainer from "./CreateItemContainer"

interface ShareToFeedProps {
    accessToken: string
    instagramId: string
    imageUrls: string[]
    caption: string
}
export default async function shareToFeed({ instagramId, imageUrls, caption, accessToken }: ShareToFeedProps) {

    const promises = imageUrls.map(async (imageUrl) => await createItemContainer({ accessToken, instagramId, imageUrl }))
    const containerItens = await Promise.all(promises)
    const containerId = await CreateCarouselContainer({ accessToken, instagramId, containerItens, caption })
    const mediaId = await publishContainer(instagramId, containerId, accessToken)
    return mediaId
}