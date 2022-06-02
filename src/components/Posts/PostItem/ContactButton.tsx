import { Flex, Icon, Text } from '@chakra-ui/react'
import Link from 'next/link'

import React from 'react'
import { IconType } from 'react-icons'

interface ContactButtonProps {
    displayName: string
    link: string
    icon: IconType
    color?: string
}

function ContactButton({ displayName, icon, color, link }: ContactButtonProps) {
    return (
        <Link href={link} passHref={true}>
            <Flex
                align='center'
                px={2}
                borderRadius='md'
                _hover={{ bg: `${color}.200`, outline: 'none' }}
                cursor='pointer'
                fontSize='sm'
                fontWeight='bold'
                bg={`${color}.400`}
                color='white'
            >
                <Icon as={icon} mr={1} />
                <Text>{displayName}</Text>
            </Flex>
        </Link >
    )
}

export default ContactButton