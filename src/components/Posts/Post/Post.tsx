import { Alert, AlertIcon, Divider, Flex, Icon, Image, Skeleton, Spacer, Spinner, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Post } from "@atoms/postsAtom";
import Carousel from "@components/Layout/Carousel/Carousel";
import usePosts from "@hooks/usePosts";
import Contact from "./Contact";
import { BsThreeDots } from "react-icons/bs";
import MenuModal from "./MenuModal/MenuModal";


interface PostProps {
    post: Post
    userIsCreator: boolean
}

function PostComponent({ post, userIsCreator }: PostProps) {
    const router = useRouter()
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [error, setError] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

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
        <>
            <MenuModal isOpen={isOpen} onClose={onClose} userIsCreator={userIsCreator} handleDelete={handleDelete} loadingDelete={loadingDelete} />

            <Flex
                direction={{ base: 'column', md: 'row' }}
                boxShadow='lg'
                borderRadius='0px 8px 8px 8px'
                bg='white'
            >
                {error && (
                    <Alert status='error'>
                        <AlertIcon />
                        <Text mr={2}>{error}</Text>
                    </Alert>
                )}

                <Carousel imageUrls={post.imageUrls} />

                <Flex direction='column' boxSize='full'>
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
                        <Icon
                            as={BsThreeDots}
                            cursor='pointer'
                            onClick={onOpen}
                        />
                    </Flex>

                    <Divider orientation='horizontal' colorScheme='black' />
                    <Text fontSize='10pt' p={2}>
                        {post.body}
                    </Text>
                    <Spacer />
                    <Contact post={post} />
                </Flex>
            </Flex >
        </>
    )
}

export default PostComponent