import { ComponentStyleConfig } from '@chakra-ui/theme'

export const Input: ComponentStyleConfig = {
    baseStyle: {
        borderRadius: 'md',
        fontSize: "sm",
        fontWeight: 'bold',
        _focus: {
            boxShadow: "none",
        },
    },
    variants: {
        'entrance': {
            color: "red",
            bg: "blue.500",
            _placeholder: { color: 'gray.500' },
            _hover: {
                outline: 'none',
                bg: 'white',
                border: '1px solid',
                borderColor: 'black'
            }

        }
    },
};