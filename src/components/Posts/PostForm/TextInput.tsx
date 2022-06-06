import { Contact, Post } from "@atoms/postsAtom"
import { Button, Flex, Grid, GridItem, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Textarea } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import { BsFacebook, BsWhatsapp } from "react-icons/bs"
import { FaFacebookSquare } from "react-icons/fa"
import { SiInstagram } from "react-icons/si"
import { text } from "stream/consumers"

interface TextInputProps {
    post: Post
    setPost: (post: Post) => void
}

function TextInput({ post, setPost }: TextInputProps) {
    const [tag, setTag] = useState<string>('')
    return (
        <Stack spacing={3} width='100%'>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={3}>
                <Input
                    name='categoria'
                    value={post.title}
                    onChange={(event) => setPost({ ...post, categoria: event.target.value })}
                    fontSize='10pt'
                    borderRadius={4}
                    placeholder='Categoria'
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{
                        outline: 'none',
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'black'
                    }}
                />
                <Input
                    name='subcategoria'
                    value={post.title}
                    onChange={(event) => setPost({ ...post, subcategoria: event.target.value })}
                    fontSize='10pt'
                    borderRadius={4}
                    placeholder='SubCategoria'
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{
                        outline: 'none',
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'black'
                    }}
                />
                <InputGroup size='md'>
                    <Input
                        name='tag'
                        value={tag}
                        onChange={(event) => setTag(event.target.value)}
                        fontSize='10pt'
                        borderRadius={4}
                        placeholder='Adicionar #Tag'
                        _placeholder={{ color: 'gray.500' }}
                        _hover={{
                            outline: 'none',
                            bg: 'white',
                            border: '1px solid',
                            borderColor: 'black'
                        }}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setPost({ ...post, tags: [...(post.tags || []), tag] })}>
                            Add
                        </Button>
                    </InputRightElement>
                </InputGroup>


            </Stack>
            <Input
                name='tags'
                value={post.tags}
                readOnly
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
            <Input
                name='title'
                value={post.title}
                onChange={(event) => setPost({ ...post, title: event.target.value })}
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
                value={post.body}
                onChange={(event) => setPost({ ...post, body: event.target.value })}
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
        </Stack>
    )
}

export default TextInput