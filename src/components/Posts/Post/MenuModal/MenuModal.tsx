import { Divider, Flex, Icon, Modal, ModalContent, ModalOverlay, Spinner, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'


interface MenuModalProps {
    loadingDelete: boolean
    isOpen: boolean
    userIsCreator: boolean
    onClose: () => void
    handleDelete: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

function MenuModal({ isOpen, onClose, userIsCreator, handleDelete, loadingDelete }: MenuModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius='md'>
                <Stack align='center'>

                    {userIsCreator && (
                        <>
                            <Flex
                                pt={2}
                                align='center'
                                justify='center'
                                onClick={handleDelete}
                                fontWeight='bold'
                                color='red'
                                cursor='pointer'
                                width='100%'
                            >
                                {loadingDelete && (<Spinner color='red.500' />)}
                                <Icon as={FaTrashAlt} mr={2} />
                                <Text >Deletar</Text>
                            </Flex>
                            <Divider />
                            <Text px={2} >Editar</Text>
                            <Divider />
                        </>
                    )}
                    <Text px={2}>Copiar Link</Text>
                    <Divider />
                    <Text px={2} pb={2} onClick={onClose}>Cancelar</Text>
                </Stack>
            </ModalContent>
        </Modal >
    )
}

export default MenuModal