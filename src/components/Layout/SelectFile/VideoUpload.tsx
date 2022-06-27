import { Post } from '@atoms/postsAtom'
import { AspectRatio, Box, Button, Flex, Input, InputGroup } from '@chakra-ui/react'
import { storage } from '@firebase/clientApp'
import { DocumentReference, getDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from "uuid"

interface VideoUploadProps {
    file: File
}

function VideoUpload({ file }: VideoUploadProps) {
    const [videoSrc, setVideoSrc] = useState('')
    const videoRef = useRef(null)

    const submitFileForProcessing = async () => {

        //store in storage => getDownloadUrl ( return imageUrl)
        // if (!postDocRef) throw new Error('updateFile error do not have post to upload the image')
        const videoId = uuid()
        const videoRef = ref(storage, `posts/teste/videos/${videoId}`)
        if (!file) return
        const uploadResult = await uploadBytes(videoRef, file)
        const downloadUrl = await getDownloadURL(uploadResult.ref)
        return downloadUrl
    }

    useEffect(() => {
        if (file) {
            const src = URL.createObjectURL(new Blob([file], { type: 'video/mp4' }))
            setVideoSrc(src)
        }
    }, [file])

    return (
        <Flex direction='column' marginBottom="1rem">
            <Box bg="lightgrey" marginBottom="1rem">
                <AspectRatio maxH="100%" ratio={16 / 9}>
                    <video
                        id="video-summary"
                        autoPlay
                        ref={videoRef}
                        controls
                        src={videoSrc}
                    />
                </AspectRatio>
            </Box>
            <Button colorScheme="teal" size="md" onClick={submitFileForProcessing}>
                {`Submit file for processing`}
            </Button>
        </Flex>
    )
}

export default VideoUpload