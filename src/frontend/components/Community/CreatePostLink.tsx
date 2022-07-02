import { Flex, Icon, Input } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { auth } from "@firebase/clientApp"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSetRecoilState } from "recoil"
import { authModalState } from "@atoms/authModal"
import { BsLink45Deg } from 'react-icons/bs'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'

function CreatePostLink() {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const setAuthModalState = useSetRecoilState(authModalState)

    const onClick = () => {
        if (!user) {
            setAuthModalState({
                open: true,
                view: 'login'
            })
            return
        }

        router.push(`/posts/register`)
    }

    return (
        <Flex
            justify='space-evenly'
            align='center'
            bg='white'
            height='56px'
            borderRadius={4}
            border='1px solid'
            borderColor='gray.300'
            p={2}
            mb={2}
        >
            <Icon as={IoDocumentText} fontSize={36} color='gray.300' mr={4} />
            <Input
                placeholder="Criar Post"
                fontSize='10pt'
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                bg='gray.50'
                borderColor='gray.200'
                height='36px'
                borderRadius={4}
                mr={4}
                onClick={onClick}
            />
        </Flex>
    )
}

export default CreatePostLink