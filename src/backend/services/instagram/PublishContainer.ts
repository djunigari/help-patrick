import { facebookUrl } from "@backend/utils/FacebookUtils"

export default async function publishContainer(instagramId: string, containerId: string, accessToken: string) {
    const url = `${facebookUrl}/${instagramId}/media_publish?creation_id=${containerId}&access_token=${accessToken}`
    const res = await fetch(url, { method: 'POST' })
    const data = await res.json()
    return data.id
}