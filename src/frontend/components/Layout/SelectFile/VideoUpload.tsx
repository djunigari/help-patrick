import { AspectRatio, Box, Button, Flex, Stack } from '@chakra-ui/react'
import { SelectedFile } from '@hooks/useSelectFile'
import { useEffect, useState } from 'react'

interface VideoUploadProps {
    selectedFile: SelectedFile
    setSelectedFile: (selectedFile: SelectedFile | null) => void
    selectedFiles: SelectedFile[]
    setSelectedFiles: (files: SelectedFile[]) => void
}

function VideoUpload({ selectedFile, setSelectedFile, selectedFiles, setSelectedFiles }: VideoUploadProps) {
    const [videoSrc, setVideoSrc] = useState('')

    const addVideo = async () => {
        if (selectedFile.file) {
            setSelectedFiles([...selectedFiles, selectedFile])
        }
        cancelVideoUpload()
    }

    const cancelVideoUpload = () => {
        setSelectedFile(null)
    }

    useEffect(() => {
        if (selectedFile.file) {
            const src = URL.createObjectURL(new Blob([selectedFile.file], { type: 'video/mp4' }))
            setSelectedFile({ ...selectedFile, src })
            setVideoSrc(src)
        }
    }, [selectedFile.file])

    return (
        <Flex direction='column' marginBottom="1rem">
            <Box bg="lightgrey" marginBottom="1rem">
                <AspectRatio maxH="100%" ratio={16 / 9}>
                    <video
                        id="video-summary"
                        autoPlay
                        // ref={videoRef}
                        controls
                        src={videoSrc}
                    />
                </AspectRatio>
            </Box>
            <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={{ base: 'stretch', sm: 'center' }}
                justify='center'
                width='full'
                spacing={8}
                p={4}
            >
                <Button
                    borderRadius='md'
                    bg='purple.600'
                    onClick={addVideo}
                >
                    Adicionar
                </Button>
                <Button
                    borderRadius='md'
                    bg='purple.600'
                    onClick={cancelVideoUpload}
                >
                    Cancel
                </Button>
            </Stack>
        </Flex>
    )
}

export default VideoUpload