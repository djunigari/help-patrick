import { Alert, AlertIcon, Flex, Icon, Image, Skeleton, Spinner, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { SiInstagram } from 'react-icons/si';
import { Post } from "../../../atoms/postsAtom";
import ContactButton from "./ContactButton";


interface PostItemProps {
    post: Post
    userIsCreator: boolean
    onDeletePost: (post: Post) => Promise<boolean>
    onSelectPost?: (post: Post) => void
}

function PostItem({ post, userIsCreator, onDeletePost, onSelectPost }: PostItemProps) {
    const router = useRouter()
    const [loadingImage, setLoadingImage] = useState(true)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [error, setError] = useState(false)
    const singlePostPage = !onSelectPost

    const handleDelete = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
        setLoadingDelete(true)
        try {
            const success = await onDeletePost(post)
            if (!success) {
                throw new Error('Failed to delete post')
            }
            console.log('Post was successfully deleted')

            if (singlePostPage) {
                router.push(`/`)
            }
        } catch (error: any) {
            console.log('handleDelete error', error.message)
            setError(error.message)
        }
        setLoadingDelete(false)
    }

    return (
        <Flex
            direction='column'
            border='1px solid'
            bg='white'
            borderColor={singlePostPage ? 'white' : 'gray.300'}
            borderRadius={singlePostPage ? '4px 4px 0px 0px' : '4px'}
        >
            {error && (
                <Alert status='error'>
                    <AlertIcon />
                    <Text mr={2}>{error}</Text>
                </Alert>
            )}

            {post.imageUrl && (
                <Flex justify='center' align='center'
                    _hover={{ borderColor: singlePostPage ? 'none' : 'gray.500' }}
                    cursor={singlePostPage ? 'unset' : 'pointer'}
                    onClick={() => onSelectPost && onSelectPost(post)}
                >
                    {loadingImage && (
                        <Skeleton height='200px' width='100%' borderRadius={4}>

                        </Skeleton>
                    )}
                    <Image
                        src={post.imageUrl}
                        maxWidth='100%'
                        alt='Post Image'
                        display={loadingImage ? 'none' : 'unset'}
                        onLoad={() => setLoadingImage(false)}
                    />
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
                justify='flex-end'
                mr={1}
                mb={2}
            >
                <ContactButton
                    icon={SiInstagram}
                    color='red'
                    displayName='@unknow'
                    link='https://instagram.com'
                />
                <ContactButton
                    icon={FaFacebookSquare}
                    color='blue'
                    displayName='@unknow'
                    link='https://facebook.com'
                />

                <ContactButton
                    icon={BsWhatsapp}
                    color='green'
                    displayName='080 5850 5050'
                    link='https://facebook.com'
                />

                {userIsCreator && (
                    <Flex
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
                )}
            </Stack>
        </Flex >
    )
}

export default PostItem