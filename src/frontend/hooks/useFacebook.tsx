import { FacebookAccount } from "@backend/models/FacebookAccount"
import { auth } from "@firebase/clientApp"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

function useFacebook() {
    const [user] = useAuthState(auth)
    const [facebookAccounts, setFacebookAccounts] = useState<FacebookAccount[]>([])
    const [loading, setLoading] = useState(false)

    const getFacebookAccounts = async () => {
        if (!user) return
        setLoading(true)
        const idToken = await user.getIdToken()
        const res = await fetch(`/api/facebook`,
            {
                method: 'GET',
                headers: {
                    'token': idToken as string
                }
            }
        )
        const data = await res.json()
        setFacebookAccounts(data.map((item: any) => ({ id: item.id, name: item.name })))
        setLoading(false)
    }

    return {
        getFacebookAccounts,
        facebookAccounts,
        loading
    }
}

export default useFacebook