import { AspectRatio, Box, Icon, Image, Skeleton } from "@chakra-ui/react";
import usePost from "@hooks/usePost";
import { IPost } from "@model/Post/Post";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IoImages } from "react-icons/io5";

interface PostItemProps {
    post: IPost
}

function PostItem({ post }: PostItemProps) {
    const router = useRouter()
    const imageRef = useRef<HTMLImageElement>(null)
    const [loadingImage, setLoadingImage] = useState(true)
    const { files } = usePost(post)

    useEffect(() => {
        if (loadingImage && imageRef.current?.complete) {
            setLoadingImage(false);
        }
    }, [loadingImage, imageRef]);

    return (
        <>
            {files && files.length > 0 && (
                <Box
                    position='relative'
                    cursor='pointer'
                    onClick={() => router.push(`/posts/${post.id}`)}
                >
                    {loadingImage && (
                        <Skeleton position='absolute' height='100%' width='100%' borderRadius={4}>

                        </Skeleton>
                    )}
                    {files.length > 1 && (
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
                    <AspectRatio maxW='560px' ratio={1}>
                        {files[0].type === 'image' ? (
                            <Image
                                ref={imageRef}
                                position='absolute'
                                zIndex={2}
                                src={files[0].url}
                                objectFit='cover'
                                height='100%'
                                width='100%'
                                alt='Post Image'
                                display={loadingImage ? 'none' : 'inline-block'}
                                onLoad={() => setLoadingImage(false)}
                            />
                        ) : (
                            <video
                                src={files[0].url}
                                controls={false}
                            />
                        )}
                    </AspectRatio>
                </Box>
            )}
        </>
    )
}

export default PostItem