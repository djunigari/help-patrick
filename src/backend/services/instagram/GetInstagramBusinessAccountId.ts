import getAccessToken from "backend/repositories/GetAccessToken"
import { facebookUrl } from "backend/utils/FacebookUtils"

export default async function getInstagramBusinessAccountId(userId: string, facebookPageId: string) {
    const accessToken = getAccessToken(userId)
    const url = `${facebookUrl}/${facebookPageId}?fields=instagram_business_account&access_token=${accessToken}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        return data
    } catch (error: any) {
        console.log('postFacebook', error.message)
        throw new Error('Facebook Request Error')
    }
}