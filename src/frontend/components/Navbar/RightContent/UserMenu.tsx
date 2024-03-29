import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Icon, Img, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import { CgProfile } from 'react-icons/cg'
import { FaRedditSquare } from 'react-icons/fa'
import { MdOutlineLogin } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '../../../atoms/authModal'
import { auth } from '../../../firebase/clientApp'

interface UserMenuProps {
    user?: User | null
}

function UserMenu({ user }: UserMenuProps) {
    const setAuthModalState = useSetRecoilState(authModalState)

    const logout = async () => {
        await signOut(auth)
    }

    return (
        <Menu>
            <MenuButton
                cursor='pointer'
                padding='0px 6px'
                borderRadius={4}
                _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
            >
                <Flex align='center'>
                    <Flex align='center'>
                        {user ? (
                            <>
                                {user.photoURL ? (
                                    <Img src={user.photoURL} borderRadius='full' mr={2} height={8} />
                                ) : (
                                    <Icon fontSize={24} mr={1} color='gray.300' as={FaRedditSquare} />
                                )}
                                <Text display={{ base: 'none', lg: 'flex' }} fontWeight='semibold' mr={2} >
                                    {user?.displayName || user.email?.split('@')[0]}
                                </Text>
                            </>
                        ) : (
                            <Icon fontSize={24} color='gray.400' mr={1} as={VscAccount} />
                        )}
                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>
                {user ? (
                    <>
                        <MenuItem
                            fontSize='10pt'
                            fontWeight={700}
                            _hover={{ bg: 'blue.500', color: 'white' }}
                        >
                            <Flex align='center'>
                                <Icon fontSize={20} mr={2} as={CgProfile} />
                                Profile
                            </Flex>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                            fontSize='10pt'
                            fontWeight={700}
                            _hover={{ bg: 'blue.500', color: 'white' }}
                            onClick={logout}
                        >
                            <Flex align='center'>
                                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                                Logout
                            </Flex>
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem
                            fontSize='10pt'
                            fontWeight={700}
                            _hover={{ bg: 'blue.500', color: 'white' }}
                            onClick={() => setAuthModalState({ open: true, view: 'login' })}
                        >
                            <Flex align='center'>
                                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                                Log In / Sign Up
                            </Flex>
                        </MenuItem>
                    </>
                )}
            </MenuList>
        </Menu >
    )
}

export default UserMenu