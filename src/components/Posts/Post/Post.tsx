import { Post } from "@atoms/postsAtom";
import { Alert, AlertIcon, Box, Button, Divider, Flex, Icon, Spacer, Stack, Text, useDisclosure } from "@chakra-ui/react";
import Carousel from "@components/Layout/Carousel/Carousel";
import usePosts from "@hooks/usePosts";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoPaperPlaneOutline } from "react-icons/io5";
import Contact from "./Contact";
import MenuModal from "./MenuModal/MenuModal";
import { httpsCallable } from 'firebase/functions';
import { auth, firestore, functions } from "@firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, getDoc } from "firebase/firestore";


interface PostProps {
    post: Post
    userIsCreator: boolean
}

function PostComponent({ post, userIsCreator }: PostProps) {
    const [user, loadingUser] = useAuthState(auth)
    const router = useRouter()
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [error, setError] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { onDeletePost } = usePosts()

    // const postFacebook = httpsCallable(functions, 'postFacebook');

    const handleDelete = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
        setLoadingDelete(true)
        try {
            const success = await onDeletePost(post)
            if (!success) {
                throw new Error('Failed to delete post')
            }
            console.log('Post was successfully deleted')

            router.push(`/`)
        } catch (error: any) {
            console.log('handleDelete error', error.message)
            setError(error.message)
        }
        setLoadingDelete(false)
    }

    return (
        <>
            <MenuModal
                isOpen={isOpen}
                onClose={onClose}
                userIsCreator={userIsCreator}
                handleEdit={() => router.push(`/posts/${post.id}/edit`)}
                handleDelete={handleDelete} loadingDelete={loadingDelete}
            />

            <Flex
                direction={{ base: 'column', md: 'row' }}
                boxShadow='lg'
                borderRadius={{ base: '0px 0px 8px 8px', md: '0px 8px 8px 8px' }}
                bg='white'
                pb={3}
            >
                {error && (
                    <Alert status='error'>
                        <AlertIcon />
                        <Text mr={2}>{error}</Text>
                    </Alert>
                )}
                <Box width={{ base: '100%', md: '50%' }}>
                    <Carousel imageUrls={post.imageUrls} />
                </Box>

                <Flex direction='column' boxSize='full' width={{ base: '100%', md: '50%' }}>
                    <Flex
                        align='center'
                        justify='space-between'
                        p={2}
                        fontSize='xl'
                        fontWeight={600}
                    >
                        <Text >
                            {post.title}
                        </Text>
                        {userIsCreator ? (
                            <Icon
                                as={BsThreeDots}
                                cursor='pointer'
                                onClick={onOpen}
                            />
                        ) : (
                            <Icon
                                as={IoPaperPlaneOutline}
                                cursor='pointer'
                                onClick={onOpen}
                            />

                        )}

                    </Flex>
                    <Divider orientation='horizontal' colorScheme='black' mb={2} />
                    <Contact post={post} />

                    <Text fontSize='10pt' p={2}>
                        {post.body}
                    </Text>

                    <Spacer />
                    <Divider />
                    <Stack direction='row' p={2}>
                        {post.tags?.map(item => (
                            <Text
                                key={item}
                                fontSize='sm'
                                fontWeight='semibold'
                                color='orange'
                            >
                                {`#${item} `}
                            </Text>
                        ))}
                    </Stack>
                    <Button mx={2} borderRadius='sm' bg='green'
                        onClick={async () => {
                            const userDocRef = doc(collection(firestore, 'users'), user?.uid)
                            const userDoc = await getDoc(userDocRef)

                            const instagramId = userDoc.data()?.facebookAcount?.instagramAccountId
                            if (!post.imageUrls?.length) return
                            const image = encodeURIComponent(post.imageUrls[0])
                            console.log(image)
                            //17841451752634556
                            //109673861780729
                            const tokenDocRef = doc(collection(firestore, 'tokens'), user?.uid)
                            const tokenDoc = await getDoc(tokenDocRef)
                            const accessToken = tokenDoc.data()?.accessToken
                            const url = `https://graph.facebook.com/v14.0/${instagramId}/media?image_url=${image}&caption=%23BronzFonz&access_token=${accessToken}`

                            const token = await user?.getIdToken()
                            const res = await fetch(url,
                                {
                                    method: 'POST',
                                }
                            )
                            const data = await res.json()
                            const containerId = data.id

                            const url2 = `https://graph.facebook.com/v14.0/${instagramId}/media_publish?creation_id=${containerId}&access_token=${accessToken}`
                            const res2 = await fetch(url,
                                {
                                    method: 'POST',
                                }
                            )
                            const data2 = await res2.json()
                            console.log(data2)
                        }}
                    >
                        Postar
                    </Button>
                </Flex>
            </Flex >
        </>
    )
}

export default PostComponent