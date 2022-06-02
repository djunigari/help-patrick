import { Flex, Icon, Text } from "@chakra-ui/react"
import PageContent from "@components/Layout/PageContent"
import NewPostForm from "@components/Posts/NewPostForm"
import { auth } from "@firebase/clientApp"
import { useAuthState } from "react-firebase-hooks/auth"
import { IoDocumentText } from "react-icons/io5"

function RegisterPostPage() {
    const [user] = useAuthState(auth)

    return (
        <PageContent>
            <>
                <Flex align='center' p='14px 0px' borderBottom='1px solid' borderColor='white'>
                    <Icon color='blue.400' fontSize='2xl' mr={2} as={IoDocumentText} />
                    <Text fontWeight='bold'>Create a post</Text>
                </Flex>
                {user && <NewPostForm user={user} />}
            </>
            <>

            </>
        </PageContent>
    )
}

export default RegisterPostPage