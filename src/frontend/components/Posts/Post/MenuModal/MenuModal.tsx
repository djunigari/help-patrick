import { Divider, Flex, Icon, Modal, ModalContent, ModalOverlay, Spinner, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'


interface MenuModalProps {
    loadingDelete: boolean
    isOpen: boolean
    userIsCreator: boolean
    onClose: () => void
    handleEdit: () => void
    handleDelete: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

function MenuModal({ isOpen, onClose, userIsCreator, handleEdit, handleDelete, loadingDelete }: MenuModalProps) {
    const router = useRouter()
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius='md'>
                <Flex direction='column' fontSize='sm' textAlign='center'  >
                    {userIsCreator && (
                        <>
                            <Flex
                                p={2}
                                align='center'
                                justify='center'
                                onClick={handleDelete}
                                color='red'
                                cursor='pointer'
                                width='100%'
                            >
                                {loadingDelete && (<Spinner color='red.500' />)}
                                <Icon as={FaTrashAlt} mr={2} />
                                <Text >Deletar</Text>
                            </Flex>
                            <Text p={2} borderTop='1px solid' borderColor='black' cursor='pointer' width='full'
                                onClick={handleEdit}
                            >
                                Editar
                            </Text>
                        </>
                    )}
                    <Text p={2} borderTop='1px solid' borderColor='black' cursor='pointer' width='full'
                        onClick={() => { navigator.clipboard.writeText(window.location.href) }}
                    >
                        Copiar Link
                    </Text>
                    <Text p={2} borderTop='1px solid' borderColor='black' cursor='pointer' width='full' onClick={onClose}>Cancelar</Text>
                </Flex>
            </ModalContent>
        </Modal >
    )
}

export default MenuModal