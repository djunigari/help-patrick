import { SearchIcon } from '@chakra-ui/icons'
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { User } from 'firebase/auth'

interface SearchInputProps {
    user?: User | null
}
function SearchInput({ user }: SearchInputProps) {
    return (
        <Flex flexGrow={1} maxWidth={user ? 'auto' : '600px'} mr={2} align='center'>
            <InputGroup>
                <InputLeftElement pointerEvents='none' >
                    <SearchIcon color='gray.300' mb={1} />
                </InputLeftElement>
                <Input
                    placeholder='Pesquisar por categoria'
                    height='34px'
                />
            </InputGroup>
        </Flex>
    )
}

export default SearchInput