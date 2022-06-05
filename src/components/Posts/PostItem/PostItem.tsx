import { Post } from "@atoms/postsAtom";
import { Box, Flex, Icon, Image, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IoImages } from "react-icons/io5";


interface PostItemProps {
    post: Post
}

function PostItem({ post }: PostItemProps) {
    const router = useRouter()
    const imageRef = useRef<HTMLImageElement>(null)
    const [loadingImage, setLoadingImage] = useState(true)

    useEffect(() => {
        if (loadingImage && imageRef.current?.complete) {
            setLoadingImage(false);
        }
    }, [loadingImage, imageRef]);

    return (
        <Flex
            direction='column'
            bg='white'
        >
            {post.imageUrls?.length && (
                <Box
                    position='relative'
                    cursor='pointer'
                    height='200px'
                    onClick={() => router.push(`/posts/${post.id}`)}
                >
                    {loadingImage && (
                        <Skeleton position='absolute' height='100%' width='100%' borderRadius={4}>

                        </Skeleton>
                    )}
                    {post.imageUrls.length > 1 && (
                        <Icon
                            m={2}
                            position='absolute'
                            zIndex={3}
                            right={0}
                            color='white'
                            fontSize={{ base: 'sm', md: 'xl' }}
                            fontWeight='bold'
                            as={IoImages}
                        />
                    )}
                    <Image
                        ref={imageRef}
                        position='absolute'
                        zIndex={2}
                        src={post.imageUrls[0]}
                        objectFit='cover'
                        height='100%'
                        width='100%'
                        alt='Post Image'
                        display={loadingImage ? 'none' : 'inline-block'}
                        onLoad={() => setLoadingImage(false)}
                    />
                </Box>
            )}
        </Flex >
    )
}

export default PostItem