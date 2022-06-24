export default async function checkingRateLimitUsageOk(instagramId: string, accessToken: string) {
    const url = `https://graph.facebook.com/${instagramId}/content_publishing_limit?access_token=${accessToken}`
    console.log('checkingRateLimitUsageOk', url)
    return fetch(url).then(res => res.json()).then(data => data.data[0]).then(data => data.quota_usage).catch(e => console.error(e.message))
}