import { Flex, Icon, Text } from '@chakra-ui/react'
import Link from 'next/link'

import React from 'react'
import { IconType } from 'react-icons'

interface ContactItemProps {
    displayName: string
    link: string
    icon: IconType
    color?: string
}

function ContactItem({ displayName, icon, color, link }: ContactItemProps) {
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

export default ContactItem