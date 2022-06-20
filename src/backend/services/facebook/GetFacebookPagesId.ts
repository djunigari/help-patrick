import getAccessToken from "backend/repositories/GetAccessToken"
import { facebookUrl } from "backend/utils/FacebookUtils"

export default async function getFacebookPagesId(userId: string) {
    const accessToken = getAccessToken(userId)
    const url = `${facebookUrl}/me/accounts?access_token=${accessToken}`
    try {
        const res = await fetch(url)
        const json = res.json()
        console.log(json)
        return []
    } catch (error: any) {
        console.log('postFacebook', error.message)
        throw new Error('Facebook Request Error')
    }
}