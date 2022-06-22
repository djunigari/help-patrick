import { Flex, Text } from '@chakra-ui/react'
import PageContent from '@components/Layout/PageContent'
import Facebook from '@components/Setup/Facebook/Facebook'
import { auth } from '@firebase/clientApp'
import useFacebook from '@hooks/useFacebook'
import { FacebookAccount } from 'backend/models/FacebookAccount'
import { GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
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