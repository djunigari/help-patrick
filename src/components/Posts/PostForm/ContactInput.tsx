import { Contact } from '@atoms/postsAtom'
import { Grid, GridItem, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
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
                        placeholder='Instagram'
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
                        value={contactInputs.facebook}
                        onChange={(event) => setContact({ ...contactInputs, facebook: event.target.value })}
                        placeholder='Facebook'
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
                        placeholder='Phone'
                    />
                </InputGroup>
            </GridItem>

        </Grid>
    )
}

export default ContactInput