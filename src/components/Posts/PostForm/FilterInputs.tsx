import { Post } from '@atoms/postsAtom'
import { Grid, GridItem, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsHash, BsPlusCircle } from 'react-icons/bs'

interface FilterInputsProps {
    post: Post
    setPost: (post: Post) => void
}

function FilterInputs({ post, setPost }: FilterInputsProps) {
    const [tag, setTag] = useState<string>('')
    return (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={2}>
            <GridItem>
                <Input
                    name='category'
                    value={post.title}
                    onChange={(event) => setPost({ ...post, category: event.target.value })}
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
            </GridItem>
            <GridItem>
                <Input
                    name='subcategory'
                    value={post.title}
                    onChange={(event) => setPost({ ...post, subcategory: event.target.value })}
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
            </GridItem>
            <GridItem>
                <InputGroup size='md'>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<BsHash color="orange" />}
                    />
                    <Input
                        name='tag'
                        value={tag}
                        onChange={(event) => setTag(event.target.value)}
                        fontSize='10pt'
                        color='orange'
                        borderRadius={4}
                        placeholder='Adicionar # Tag'
                        _placeholder={{ color: 'gray.500' }}
                        _hover={{
                            outline: 'none',
                            bg: 'white',
                            border: '1px solid',
                            borderColor: 'black'
                        }}

                    />
                    <InputRightElement
                        bg='gray.200'
                        children={<BsPlusCircle color="orange" />}
                        cursor='pointer'
                        onClick={() => setPost({ ...post, tags: [...(post.tags || []), tag] })}
                    />
                </InputGroup>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 3 }}>
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
            </GridItem>
        </Grid>
    )
}

export default FilterInputs