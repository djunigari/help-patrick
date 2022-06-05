import { Contact } from "@atoms/postsAtom"
import { Button, Flex, Input, InputGroup, InputLeftElement, Stack, Textarea } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { BsFacebook, BsWhatsapp } from "react-icons/bs"
import { FaFacebookSquare } from "react-icons/fa"
import { SiInstagram } from "react-icons/si"
import { text } from "stream/consumers"

interface TextInputProps {
    textInputs: {
        title: string,
        body: string
    }
    contactInputs: Contact
    setContact: (contact: Contact) => void
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleCreatePost: () => void
    loading: boolean
}

function TextInput({ textInputs, onChange, handleCreatePost, loading, contactInputs, setContact }: TextInputProps) {
    return (
        <Stack spacing={3} width='100%'>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SiInstagram color='red' />}
                />
                <Input
                    name='instagram'
                    value={contactInputs.instagram}
                    onChange={(event) => setContact({ ...contactInputs, instagram: event.target.value })}
                    fontSize='10pt'
                    borderRadius={4}
                    placeholder='Instagram'
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{
                        outline: 'none',
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'black'
                    }}
                />
            </InputGroup>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<BsFacebook color='blue' />}
                />
                <Input
                    name='facebook'
                    onChange={(event) => setContact({ ...contactInputs, facebook: event.target.value })}
                    fontSize='10pt'
                    borderRadius={4}
                    placeholder='Facebook'
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{
                        outline: 'none',
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'black'
                    }}
                />
            </InputGroup>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<BsWhatsapp color='green' />}
                />
                <Input
                    name='phone'
                    type='phone'
                    value={contactInputs.phone}
                    onChange={(event) => setContact({ ...contactInputs, phone: event.target.value })}
                    fontSize='10pt'
                    borderRadius={4}
                    placeholder='Phone'
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{
                        outline: 'none',
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'black'
                    }}
                />
            </InputGroup>

            <Input
                name='title'
                value={textInputs.title}
                onChange={onChange}
                fontSize='10pt'
                borderRadius={4}
                placeholder='Title'
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'black'
                }}
            />
            <Textarea
                name='body'
                value={textInputs.body}
                onChange={onChange}
                fontSize='10pt'
                borderRadius={4}
                height='100px'
                placeholder='Text (optional)'
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'black'
                }}
            />
            <Flex justify='flex-end'>
                <Button
                    height='34px'
                    padding='0px 30px'
                    disabled={!textInputs.title}
                    isLoading={loading}
                    onClick={handleCreatePost}
                >
                    Post
                </Button>
            </Flex>
        </Stack>
    )
}

export default TextInput