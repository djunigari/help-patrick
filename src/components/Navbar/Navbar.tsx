import { Flex, Image } from '@chakra-ui/react'
import RightContent from './RightContent/RightContent'
import SearchInput from './SearchInput'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/clientApp';
import { useRouter } from 'next/router';

function Navbar() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter()
    return (
        <Flex bg="white" height="44px" padding="6px 12px" justify={{ md: 'space-between' }}>
            <Flex
                align='center'
                justify={{ base: '40px', md: 'auto' }}
                mr={{ base: 0, md: 2 }}
                onClick={() => router.push('/')}
                cursor='pointer'
            >
                <Image src='/images/redditFace.svg' height='30px' alt='Logo Image'/>
                <Image src='/images/redditText.svg' height='46px' display={{ base: 'none', md: 'unset' }} alt='Logo Image' />
            </Flex>
            <SearchInput user={user} />
            <RightContent user={user} />
        </Flex>
    )
}

export default Navbar