import { Flex, Icon, Text } from '@chakra-ui/react'
import PageContent from '@components/Layout/PageContent'
import EditPostForm from '@components/Posts/EditPostForm'
import { auth, firestore } from '@firebase/clientApp'
import { IPost } from '@model/Post/Post'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { IoDocumentText } from 'react-icons/io5'
import safeJsonStringify from 'safe-json-stringify'

interface EditPostPageProps {
    post: IPost
}
function EditPostPage({ post }: EditPostPageProps) {
    const [user] = useAuthState(auth)

    return (
        <PageContent>
            <>
                <Flex align='center' p='14px 0px' borderBottom='1px solid' borderColor='white'>
                    <Icon color='blue.400' fontSize='2xl' mr={2} as={IoDocumentText} />
                    <Text fontWeight='bold'>Edit a post</Text>
                </Flex>
                {user && <EditPostForm oldVersionPost={post} user={user} />}
            </>
            <>

            </>
        </PageContent>
    )
}

export default EditPostPage


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { postId } = context.query

    try {
        const postDocRef = doc(firestore, 'posts', postId as string)
        const postDoc = await getDoc(postDocRef)

        return {
            props: {
                post: JSON.parse(
                    safeJsonStringify({
                        id: postDoc.id,
                        ...postDoc.data()
                    }))
            }
        }
    } catch (error) {
        console.log('getStaticProps error', error)
    }

    return {
        notFound: true
    }
}