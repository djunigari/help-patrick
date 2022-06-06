import { Contact } from '@atoms/postsAtom'
import { Flex, InputGroup, InputLeftElement, Input, Stack, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import { BsFacebook, BsWhatsapp } from 'react-icons/bs'
import { SiInstagram } from 'react-icons/si'

interface ContactInputProps {
    contactInputs: Contact
    setContact: (contact: Contact) => void
}

function ContactInput({ contactInputs, setContact }: ContactInputProps) {
    return (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={2}>
            <GridItem>
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
            </GridItem>
            <GridItem>
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
            </GridItem>
            <GridItem>
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
            </GridItem>

        </Grid>
    )
}

export default ContactInput