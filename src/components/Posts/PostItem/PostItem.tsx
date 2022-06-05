import { Post } from "@atoms/postsAtom";
import { Flex, Image, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";


interface PostItemProps {
    post: Post
}

function PostItem({ post }: PostItemProps) {
    const router = useRouter()
    const [loadingImage, setLoadingImage] = useState(true)

    return (
        <Flex
            direction='column'
            border='1px solid'
            bg='white'
            borderColor='white'
            borderRadius='4px'
        >
            {post.imageUrls?.length && (
                <Flex
                    justify='center'
                    align='center'
                    _hover={{ borderColor: 'gray.500' }}
                    cursor='pointer'
                    onClick={() => router.push(`/posts/${post.id}`)}
                >
                    {loadingImage && (
                        <Skeleton height='200px' width='100%' borderRadius={4}>

                        </Skeleton>
                    )}
                    <Image
                        src={post.imageUrls[0]}
                        objectFit='cover'
                        height='200px'
                        width='100%'
                        alt='Post Image'
                        display={loadingImage ? 'none' : 'unset'}
                        onLoad={() => setLoadingImage(false)}
                    />
                </Flex>
            )}
        </Flex >
    )
}

export default PostItem