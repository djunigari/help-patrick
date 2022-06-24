import { facebookUrl } from "backend/utils/FacebookUtils"

interface GetFacebookPagesIdProps {
    accessToken: string
}

export default async function getFacebookPagesId({ accessToken }: GetFacebookPagesIdProps) {
    const url = `${facebookUrl}/me/accounts?access_token=${accessToken}`
    return fetch(url)
        .then(res => res.json())
        .then(data => data.data)
        .then(data => data.map((item: any) => ({ id: item.id, name: item.name })))
        .catch(e => { throw new Error(e) })
}