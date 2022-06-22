import getAccessToken from "backend/repositories/GetAccessToken"
import { facebookUrl } from "backend/utils/FacebookUtils"

export default async function getInstagramBusinessAccountId(userId: string, facebookPageId: string) {
    const accessToken = await getAccessToken(userId)
    const url = `${facebookUrl}/${facebookPageId}?fields=instagram_business_account&access_token=${accessToken}`
    try {
        console.log(url)
        const res = await fetch(url)
        const { instagram_business_account } = await res.json()
        return instagram_business_account.id
    } catch (error: any) {
        console.log('postFacebook', error.message)
        throw new Error('Facebook Request Error')
    }
}