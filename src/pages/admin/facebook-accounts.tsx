import { Flex, Text } from '@chakra-ui/react'
import PageContent from '@components/Layout/PageContent'
import { auth } from '@firebase/clientApp'
import useFacebook from '@hooks/useFacebook'
import { FacebookAccount } from 'backend/models/FacebookAccount'
import { GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

function FacebookAccountsPage() {
    const [user, loadingUser] = useAuthState(auth)
    const { getFacebookPagesId } = useFacebook()
    const [accounts, setAccounts] = useState<FacebookAccount[]>([])

    const fetchAccounts = async () => {
        const token = await user?.getIdToken()
        const data = await getFacebookPagesId(token as string)
        console.log(data)
        setAccounts(data);
    }

    useEffect(() => {
        if (!loadingUser && user) fetchAccounts()
        return () => setAccounts([])
    }, [user, loadingUser])

    return (
        <PageContent>
            <>
                <Flex direction='column'>
                    {accounts.map((item, i) => (
                        <Flex key={i}>
                            <Text>
                                ID:{item.id}
                            </Text>
                            <Text ml={2}>
                                Nome:{item.name}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
            </>
            <>

            </>
        </PageContent>
    )
}

export default FacebookAccountsPage