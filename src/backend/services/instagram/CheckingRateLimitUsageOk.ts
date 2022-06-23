export default async function checkingRateLimitUsageOk(instagramId: string, accessToken: string) {
    const url = `https://graph.facebook.com/${instagramId}/content_publishing_limit?access_token=${accessToken}`

    const res = await fetch(url)
    const data = await res.json()
    return data.data[0].quota_usage
}