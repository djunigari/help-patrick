import { Flex, Grid, GridItem, Icon, Image, Text } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { FaTrashAlt } from "react-icons/fa"

interface ImageUploadProps {
    images?: string[]
    setImages?: (images: string[]) => void
    removedImages?: string[]
    setRemovedImages?: (images: string[]) => void
    selectedFiles: string[]
    setSelectedFiles: (values: string[]) => void
    onSelectFile: (event: ChangeEvent<HTMLInputElement>) => void
}

function ImageUpload({ images, setImages, removedImages, setRemovedImages, selectedFiles, setSelectedFiles, onSelectFile }: ImageUploadProps) {
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

            {selectedFiles?.map(file => (
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
                        onClick={() => setSelectedFiles(selectedFiles.filter(item => item !== file))}
                    >
                        <Icon as={FaTrashAlt} mr={2} />
                        <Text>Remover</Text>
                    </Flex>
                </GridItem>
            ))}
        </Grid >

    )
}

export default ImageUpload