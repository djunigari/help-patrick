import { Flex, Grid, Stack } from '@chakra-ui/react'

interface PageContentProps {
    children: any
}

function PageContent({ children }: PageContentProps) {
    return (
        <Flex
            justify='center'
            p='16px 0px'
        >
            <Stack
                direction='column'
                justify='center'
                width='95%'
                maxWidth='860px'
            >
                <Flex
                    direction='column'
                >
                    {children && children[0 as keyof typeof children]}
                </Flex>
                <Flex
                    direction='column'
                >
                    {children && children[1 as keyof typeof children]}
                </Flex>
            </Stack>
        </Flex>
    )
}

export default PageContent