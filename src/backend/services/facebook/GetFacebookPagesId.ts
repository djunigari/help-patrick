import getAccessToken from "backend/repositories/GetAccessToken"
import { facebookUrl } from "backend/utils/FacebookUtils"

export default async function getFacebookPagesId(userId: string) {
    const accessToken = await getAccessToken(userId)
    const url = `${facebookUrl}/me/accounts?access_token=${accessToken}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data.data.map((item: any) => ({ id: item.id, name: item.name }))
    } catch (error: any) {
        console.log('postFacebook', error.message)
        throw new Error('Facebook Request Error')
    }
}