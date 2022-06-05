import { Post } from '@atoms/postsAtom';
import { Stack } from '@chakra-ui/react';
import React from 'react';
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { SiInstagram } from 'react-icons/si';
import ContactItem from './ContactItem';

interface ContactProps {
    post: Post
}

function Contact({ post }: ContactProps) {
    return (
        <Stack
            direction='row'
            spacing={1}
        >
            {post.contact.instagram && (
                <ContactItem
                    icon={SiInstagram}
                    color='red'
                    displayName={`@${post.contact.instagram}`}
                    link={`https://instagram.com/${post.contact.instagram}`}
                />
            )}
            {post.contact.facebook && (
                <ContactItem
                    icon={FaFacebookSquare}
                    color='blue'
                    displayName={`@${post.contact.facebook}`}
                    link={`https://facebook.com/${post.contact.facebook}`}
                />
            )}

            {post.contact.phone && (
                <ContactItem
                    icon={BsWhatsapp}
                    color='green'
                    displayName={post.contact.phone}
                    link='https://whatsapp.com'
                />
            )}
        </Stack>
    )
}

export default Contact