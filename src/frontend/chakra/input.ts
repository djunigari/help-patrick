import { ComponentStyleConfig } from '@chakra-ui/theme'

export const Input: ComponentStyleConfig = {
    baseStyle: {
        field: {
            border: "1px solid",
            borderColor: "gray.400",
            bg: 'gray.50',
            _placeholder: { color: 'gray.500' },
            _focus: {
                outline: 'none',
                border: '1px solid',
                borderColor: 'blue.500',
                boxShadow: 'none'
            },

        },
    },
};