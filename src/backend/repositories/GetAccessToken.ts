export default async function getAccessToken(userId: string) {
    if (!userId) throw new Error('permission-denied')
    const doc = collection(firestore, 'tokens')

    return doc.data()?.accessToken
}