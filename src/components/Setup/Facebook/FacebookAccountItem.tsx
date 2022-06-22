import { FacebookAccount } from '@backend/models/FacebookAccount'
import { Button, Flex, Text } from '@chakra-ui/react'
import useInstagram from '@hooks/useInstagram'
import React from 'react'

interface FacebookAccountItemProps {
    account: FacebookAccount
}

function FacebookAccountItem({ account }: FacebookAccountItemProps) {
    const { getInstagramAccountId, loading, instagramAccountId, saveAccountIdToFirebase, saveLoading } = useInstagram()

    return (
        <Flex align='center' justify='space-between' width='full' p={2}>
            <Text>{account.name}</Text>
            {instagramAccountId ? (
                <>
                    <Text>
                        {instagramAccountId}
                    </Text>
                    <Button borderRadius='md' onClick={() => saveAccountIdToFirebase(account.id)} isLoading={saveLoading}>
                        Save
                    </Button>
                </>
            ) : (
                <Button
                    borderRadius='md'
                    onClick={() => getInstagramAccountId(account.id)}
                    isLoading={loading}
                >
                    Instagram Accounts
                </Button>
            )}

        </Flex >
    )
}

export default FacebookAccountItem