import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { useRef } from "react"
import { IoAddCircleSharp } from "react-icons/io5"

interface AddButtonProps {
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

function AddButton({ onFileChange }: AddButtonProps) {
    const selectedFileRef = useRef<HTMLInputElement>(null)
    return (
        <Box
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
                direction='column'
                justify='center'
                align='center'
                height={{ base: '100px', md: '200px' }}
                cursor='pointer'
                onClick={() => selectedFileRef.current?.click()}
            >
                <Icon fontSize='4xl' as={IoAddCircleSharp} />
                <Text>Adicionar Imagem/Video</Text>
            </Flex>
            <input
                hidden
                ref={selectedFileRef}
                type='file'
                // accept="audio/*, video/*"
                accept="image/*,video/*"
                onChange={onFileChange}
            />
        </Box>
    )
}

export default AddButton