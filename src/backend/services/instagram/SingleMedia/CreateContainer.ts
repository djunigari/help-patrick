import { facebookUrl } from "@backend/utils/FacebookUtils"

export default async function createContainer(accessToken: string, instagramId: string, imageUrl: string, caption: string) {
    const url = `${facebookUrl}/${instagramId}/media?image_url=${encodeURIComponent(imageUrl)}&caption=${caption}&access_token=${accessToken}`
    const res = await fetch(url, { method: 'POST' })
    const data = await res.json()
    return data.id
}