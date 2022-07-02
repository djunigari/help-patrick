import { Post } from '@atoms/postsAtom'
import { Button, Flex, Grid, GridItem, Icon, Input, Stack, InputGroup, InputLeftElement, InputRightElement, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsHash, BsPlusCircle } from 'react-icons/bs'
import { FiDelete } from 'react-icons/fi'

interface FilterInputsProps {
    post: Post
    setPost: (post: Post) => void
}

function FilterInputs({ post, setPost }: FilterInputsProps) {
    const [tag, setTag] = useState<string>('')

    const addTag = (tag: string) => {
        if (!post.tags?.includes(tag)) {
            setPost({ ...post, tags: [...(post.tags || []), tag] })
        }
        setTag('')
    }

    const removeTag = (tag: string) => {
        if (post.tags?.includes(tag)) {
            setPost({ ...post, tags: post.tags.filter(item => item !== tag) })
        }
    }

    return (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={3}>
            <GridItem>
                <Input
                    name='category'
                    value={post.category}
                    onChange={(event) => setPost({ ...post, category: event.target.value })}
                    placeholder='Categoria'
                />
            </GridItem>
            <GridItem>
                <Input
                    name='subcategory'
                    value={post.subcategory}
                    onChange={(event) => setPost({ ...post, subcategory: event.target.value })}
                    placeholder='SubCategoria'
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
                        placeholder='Adicionar # Tag'
                    />
                    <InputRightElement>
                        <Button
                            mr={2}
                            size='sm'
                            bg='orange'
                            _hover={{ bg: 'orange.200' }}
                            onClick={() => addTag(tag)}
                        >
                            <Icon as={BsPlusCircle} fontSize='sm' />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </GridItem>
            {post.tags && post.tags.length > 0 && (
                <GridItem colSpan={{ base: 1, md: 3 }}>
                    <Stack direction='row' >
                        {post.tags?.map(item => (
                            <Flex
                                key={item}
                                p={2}
                                borderRadius='md'
                                align='center'
                                border='1px dashed'
                                color='gray.400'
                            >
                                <Text
                                    fontSize='sm'
                                    fontWeight='semibold'
                                    color='orange'
                                >
                                    {`#${item} `}
                                </Text>
                                <Icon ml={1} as={FiDelete} color='red' cursor='pointer'
                                    onClick={() => removeTag(item)}
                                />
                            </Flex>
                        ))}
                    </Stack>
                </GridItem>
            )}
        </Grid>
    )
}

export default FilterInputs