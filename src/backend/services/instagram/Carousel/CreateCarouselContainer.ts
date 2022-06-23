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
    const res = await fetch(url, { method: 'POST' })
    const data = await res.json()
    return data.id
}
