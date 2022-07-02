import { AspectRatio, Flex, Grid, GridItem, Icon, Image, Text } from "@chakra-ui/react"
import { SelectedFile } from "@hooks/useSelectFile"
import { FaTrashAlt } from "react-icons/fa"

interface ImageUploadProps {
    images?: string[]
    setImages?: (images: string[]) => void
    removedImages?: string[]
    setRemovedImages?: (images: string[]) => void
    selectedFiles: SelectedFile[]
    setSelectedFiles: (fileSelecteds: SelectedFile[]) => void
}

function FileUpload({ images, setImages, removedImages, setRemovedImages, selectedFiles, setSelectedFiles }: ImageUploadProps) {
    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={1}>
            {images?.map(file => (
                <GridItem key={file}>
                    <Image
                        src={file}
                        fit='cover'
                        width='100%'
                        height={{ base: '100px', md: '200px' }}
                        alt='Image Selected'
                    />
                    <Flex
                        zIndex={2}
                        justify='center'
                        align='center'
                        bg='red.200'
                        width='100%'
                        color='gray.600'
                        fontWeight='semibold'
                        cursor='pointer'
                        _hover={{ bg: 'red.100', color: 'gray.400' }}
                        onClick={() => {
                            setImages && setImages(images.filter(item => item !== file))
                            setRemovedImages && setRemovedImages([...(removedImages || []), file])
                        }}
                    >
                        <Icon as={FaTrashAlt} mr={2} />
                        <Text>Remover</Text>
                    </Flex>
                </GridItem>
            ))}

            {selectedFiles?.map((selectedFile, i) => (
                <GridItem key={i}>
                    {selectedFile.type === 'image' && (
                        <Image
                            src={selectedFile.src}
                            fit='cover'
                            width='100%'
                            height={{ base: '100px', md: '200px' }}
                            alt='Image Selected'
                        />
                    )}
                    {selectedFile.type === 'video' && (
                        <AspectRatio maxH="100%" ratio={16 / 9}>
                            <video
                                id="video-summary"
                                controls
                                src={selectedFile.src}
                            />
                        </AspectRatio>
                    )}
                    <Flex
                        zIndex={2}
                        justify='center'
                        align='center'
                        bg='red.200'
                        width='100%'
                        color='gray.600'
                        fontWeight='semibold'
                        cursor='pointer'
                        _hover={{ bg: 'red.100', color: 'gray.400' }}
                        onClick={() => setSelectedFiles(selectedFiles.filter(item => item.src !== selectedFile.src))}
                    >
                        <Icon as={FaTrashAlt} mr={2} />
                        <Text>Remover</Text>
                    </Flex>
                </GridItem>
            ))}
        </Grid >

    )
}

export default FileUpload