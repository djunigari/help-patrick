import { Flex, Grid, GridItem, Icon, Image, Text } from "@chakra-ui/react"
import { ChangeEvent, useRef } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { IoAddCircleSharp } from "react-icons/io5"

interface ImageUploadProps {
    selectedFiles: string[]
    setSelectedFiles: (values: string[]) => void
    onSelectFile: (event: ChangeEvent<HTMLInputElement>) => void
}

function ImageUpload({ selectedFiles, setSelectedFiles, onSelectFile }: ImageUploadProps) {
    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={1}>
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