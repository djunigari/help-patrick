import { Alert, AlertIcon, Box, Button, Divider, Flex, Icon, Spacer, Stack, Text, useDisclosure } from "@chakra-ui/react";
import Carousel from "@components/Layout/Carousel/Carousel";
import { auth } from "@firebase/clientApp";
import useInstagram from "@hooks/useInstagram";
import usePost from "@hooks/usePost";
import usePosts from "@hooks/usePosts";
import { IPost } from "@model/Post/Post";
import { IPostFile } from "@model/Post/PostFile";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsThreeDots } from "react-icons/bs";
import { IoPaperPlaneOutline } from "react-icons/io5";
import Contact from "./Contact";
import MenuModal from "./MenuModal/MenuModal";


interface PostProps {
    post: IPost
    userIsCreator: boolean
}

function PostComponent({ post, userIsCreator }: PostProps) {
    const router = useRouter()
    const [user, userLoading] = useAuthState(auth)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [error, setError] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { shareSingleMedia, shareCarouselMedia, loading, isRateLimiteOk } = useInstagram()
    const [isInstagramUsageOk, setIsInstagramUsageOk] = useState(false)
    const { files } = usePost(post)

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

    useEffect(() => {
        if (!userLoading && user) isRateLimiteOk().then(res => setIsInstagramUsageOk(res as boolean))
        return () => setIsInstagramUsageOk(false)
    }, [user, userLoading])

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
                    <Carousel files={files} />
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
                    {/* {isInstagramUsageOk && (
                        <Button mx={2} borderRadius='sm' bg='green'
                            onClick={async () => {
                                if (!files?.length) return

                                if (files.length > 1) {
                                    await shareCarouselMedia(files, post.body)
                                } else {
                                    await shareSingleMedia(files[0], post.body)
                                }

                            }}
                            isLoading={loading}
                        >
                            Postar
                        </Button>
                    )} */}
                </Flex>
            </Flex >
        </>
    )
}

export default PostComponent