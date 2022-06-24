import { facebookUrl } from "@backend/utils/FacebookUtils"

interface CreateItemContainerProps {
    accessToken: string
    instagramId: string
    imageUrl: string
}

export default async function createItemContainer({ instagramId, imageUrl, accessToken }: CreateItemContainerProps): Promise<string> {
    const url = `${facebookUrl}/${instagramId}/media?image_url=${encodeURIComponent(imageUrl)}&is_carousel_item=true&access_token=${accessToken}`
    console.log('createItemContainer', url)
    return fetch(url, { method: 'POST' }).then(res => res.json()).then(data => data.id).catch(e => console.error(e.message))
}