import PageContent from '@components/Layout/PageContent'
import Facebook from '@components/Setup/Facebook/Facebook'
import { auth } from '@firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'

function FacebookAccountsPage() {
    const [user] = useAuthState(auth)

    return (
        <PageContent>
            <>
                {user && (
                    <Facebook user={user} />
                )}
            </>
            <>

            </>
        </PageContent>
    )
}

export default FacebookAccountsPage