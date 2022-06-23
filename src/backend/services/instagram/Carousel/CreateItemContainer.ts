import { facebookUrl } from "@backend/utils/FacebookUtils"

interface CreateItemContainerProps {
    accessToken: string
    instagramId: string
    imageUrl: string
}

export default async function createItemContainer({ instagramId, imageUrl, accessToken }: CreateItemContainerProps): Promise<string> {
    const url = `${facebookUrl}/${instagramId}/media?image_url=${encodeURIComponent(imageUrl)}&is_carousel_item=true&access_token=${accessToken}`
    const res = await fetch(url, { method: 'POST' })
    const data = await res.json()
    return data.id
}