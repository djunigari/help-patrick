import { Button, Flex, Text } from '@chakra-ui/react'
import useFacebook from '@hooks/useFacebook'
import { User } from 'firebase/auth'
import FacebookAccountItem from './FacebookAccountItem'

interface FacebookProps {
    user: User
}

function Facebook({ user }: FacebookProps) {
    const { getFacebookAccounts, facebookAccounts, loading } = useFacebook()
    return (
        <Flex direction='column'>
            <Flex align='center' justify='space-between' bg='white' borderRadius='md' p={2} m={2} >
                <Text fontSize='lg' fontWeight='bold'>
                    Paginas do Facebook
                </Text>
                <Button
                    borderRadius='md'
                    onClick={getFacebookAccounts}
                    isLoading={loading}
                >
                    Buscar
                </Button>
            </Flex>
            {facebookAccounts && (
                <Flex align='center' justify='space-between' bg='white' borderRadius='md' p={2} m={2} >
                    {facebookAccounts.map((account, i) => (
                        <FacebookAccountItem key={i} account={account} />
                    ))}
                </Flex>
            )}
        </Flex>
    )
}

export default Facebook