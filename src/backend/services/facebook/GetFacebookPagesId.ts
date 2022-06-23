import { facebookUrl } from "backend/utils/FacebookUtils"

interface GetFacebookPagesIdProps {
    accessToken: string
}

export default async function getFacebookPagesId({ accessToken }: GetFacebookPagesIdProps) {
    const url = `${facebookUrl}/me/accounts?access_token=${accessToken}`
    const res = await fetch(url)
    const data = await res.json()
    return data.data.map((item: any) => ({ id: item.id, name: item.name }))

}