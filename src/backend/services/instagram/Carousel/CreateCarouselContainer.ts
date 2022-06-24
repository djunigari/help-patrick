import { facebookUrl } from "@backend/utils/FacebookUtils"

interface CreateCarouselContainerProps {
    instagramId: string
    caption: string
    containerItens: string[]
    accessToken: string
}

export default async function CreateCarouselContainer({ instagramId, caption, containerItens, accessToken }: CreateCarouselContainerProps) {
    const children = containerItens.reduce((prev, value) => prev.concat(`%2C${value}`))
    const url = `${facebookUrl}/${instagramId}/media?caption=${caption}&media_type=CAROUSEL&children=${children}&access_token=${accessToken}`
    console.log('CreateCarouselContainer', url)
    return fetch(url, { method: 'POST' }).then(res => res.json()).then(data => data.id).catch(e => console.error(e.message))
}
