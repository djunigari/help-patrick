import { Flex } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import React from 'react'
import AuthModal from '../../Modal/Auth/AuthModal'
import AuthButtons from './AuthButtons'
import UserMenu from './UserMenu'

interface RightContentProps {
    user?: User | null
}
function RightContent({ user }: RightContentProps) {
    return (
        <>
            <AuthModal />
            <Flex justify='center' align='center'>
                {!user && (
                    <AuthButtons />
                )}
                <UserMenu user={user} />
            </Flex>
        </>
    )
}

export default RightContent