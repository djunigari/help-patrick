import { facebookUrl } from "@backend/utils/FacebookUtils"

export default async function publishContainer(instagramId: string, containerId: string, accessToken: string) {
    const url = `${facebookUrl}/${instagramId}/media_publish?creation_id=${containerId}&access_token=${accessToken}`
    console.log('publishContainer', url)
    return fetch(url, { method: 'POST' })
        .then(res => res.json())
        .then(data => data.id)
        .catch(e => { throw new Error(e) })
}