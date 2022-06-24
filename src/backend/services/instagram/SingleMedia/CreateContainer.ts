import { facebookUrl } from "@backend/utils/FacebookUtils"

export default async function createContainer(accessToken: string, instagramId: string, imageUrl: string, caption: string) {
    const url = `${facebookUrl}/${instagramId}/media?image_url=${encodeURIComponent(imageUrl)}&caption=${caption}&access_token=${accessToken}`
    console.log('createContainer', url)
    return fetch(url, { method: 'POST' })
        .then(res => res.json())
        .then(data => data.id)
        .catch(e => { throw new Error(e) })
}