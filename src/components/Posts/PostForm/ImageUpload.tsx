import { Flex, Grid, GridItem, Icon, Image, Text } from "@chakra-ui/react"
import useSelectFile from "@hooks/useSelectFile"
import { ChangeEvent, useEffect, useRef } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { IoAddCircleSharp } from "react-icons/io5"


function ImageUpload() {
    const selectedFileRef = useRef<HTMLInputElement>(null)
    const { selectedFiles, setSelectedFiles, onSelectFile } = useSelectFile()

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
            <GridItem
                border='1px dashed'
                borderColor='blue.200'
                borderRadius={4}
                textColor='blue.200'
                bg='gray.100'
                _hover={{
                    borderColor: 'blue.400',
                    bg: 'white',
                    textColor: 'blue.400'
                }}
            >
                <Flex
                    justify='center'
                    align='center'
                    height={{ base: '100px', md: '200px' }}
                    cursor='pointer'
                    onClick={() => selectedFileRef.current?.click()}
                >
                    <Icon as={IoAddCircleSharp} />
                </Flex>
                <input hidden ref={selectedFileRef} type='file' accept="image/*" onChange={onSelectFile} />
            </GridItem>
        </Grid >

    )
}

export default ImageUpload