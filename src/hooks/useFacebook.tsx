import { auth } from "@firebase/clientApp"
import { useAuthState } from "react-firebase-hooks/auth"

function useFacebook() {
    const getFacebookPagesId = async (idToken: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/facebook`,
            {
                method: 'GET',
                headers: {
                    'token': idToken as string
                }
            }
        )
        const data = await res.json()
        return data.map((item: any) => ({ id: item.id, name: item.name }))
    }
    return {
        getFacebookPagesId
    }
}

export default useFacebook