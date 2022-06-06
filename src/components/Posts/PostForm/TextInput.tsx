import { Post } from "@atoms/postsAtom"
import { Input, Stack, Textarea } from "@chakra-ui/react"

interface TextInputProps {
    post: Post
    setPost: (post: Post) => void
}

function TextInput({ post, setPost }: TextInputProps) {
    return (
        <Stack spacing={3} width='100%'>

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