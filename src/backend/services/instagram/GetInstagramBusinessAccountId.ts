import { facebookUrl } from "backend/utils/FacebookUtils"

interface GetInstagramBusinessAccountIdProps {
    facebookPageId: string
    accessToken: string
}

export default async function getInstagramBusinessAccountId({ facebookPageId, accessToken }: GetInstagramBusinessAccountIdProps) {
    const url = `${facebookUrl}/${facebookPageId}?fields=instagram_business_account&access_token=${accessToken}`
    const res = await fetch(url)
    const { instagram_business_account } = await res.json()
    return instagram_business_account.id
}