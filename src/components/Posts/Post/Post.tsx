import { Alert, AlertIcon, Flex, Icon, Image, Skeleton, Spacer, Spinner, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Post } from "@atoms/postsAtom";
import Carousel from "@components/Layout/Carousel/Carousel";
import usePosts from "@hooks/usePosts";
import Contact from "./Contact";


interface PostProps {
    post: Post
    userIsCreator: boolean
}

function PostComponent({ post, userIsCreator }: PostProps) {
    const router = useRouter()
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [error, setError] = useState(false)

    const { onDeletePost } = usePosts()

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
        <Flex
            direction='column'
            bg='white'
        >
            {error && (
                <Alert status='error'>
                    <AlertIcon />
                    <Text mr={2}>{error}</Text>
                </Alert>
            )}

            {post.imageUrls?.length && (
                <Flex
                    justify='center'
                    align='center'
                    _hover={{ borderColor: 'none' }}
                    cursor={'unset'}
                >
                    <Carousel imageUrls={post.imageUrls} />
                </Flex>
            )}

            <Flex direction='column' p={2}>
                <Text fontSize='12pt' fontWeight={600}>
                    {post.title}
                </Text>
                <Text fontSize='10pt'>
                    {post.body}
                </Text>
            </Flex>

            <Stack
                direction='row'
                spacing={1}
                ml={1}
                mb={2}
            >
                <Contact post={post} />

                {userIsCreator && (
                    <>
                        <Spacer />
                        <Flex
                            mr={1}
                            align='center'
                            p='8px 10px'
                            borderRadius={4}
                            _hover={{ bg: 'gray.200' }}
                            cursor='pointer'
                            onClick={handleDelete}
                        >
                            {loadingDelete ? (
                                <Spinner size='sm' />
                            ) : (
                                <>
                                    <Icon as={AiOutlineDelete} mr={2} />
                                    <Text fontSize='9pt'>Delete</Text>
                                </>
                            )}
                        </Flex>
                    </>
                )}
            </Stack>
        </Flex >
    )
}

export default PostComponent