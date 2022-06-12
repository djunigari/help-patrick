import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { auth } from '@firebase/clientApp';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useSignInWithFacebook } from 'react-firebase-hooks/auth';

function OAuthButtons() {
    // const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);
    const [signInWithFacebook, userCred, loading, error] = useSignInWithFacebook(auth);
    const [accessToken, setAccessToken] = useState<string>('')

    useEffect(() => {
        if (userCred) {
            const credential = FacebookAuthProvider.credentialFromResult(userCred);
            setAccessToken(credential?.accessToken || '')
            console.log(credential?.accessToken)
        }
        return () => setAccessToken('')
    }, [userCred])

    return (
        <Flex direction='column' width='100%' mb={4}>
            {/* <Button
                variant='oauth'
                mb={2}
                isLoading={loading}
                onClick={() => signInWithGoogle()}
            >
                <Image src='/images/googlelogo.png' height='20px' mr={4} />
                Continue with Google
            </Button> */}
            <Button
                variant='oauth'
                mb={2}
                isLoading={loading}
                onClick={() => signInWithFacebook()}
            >
                <Image src='/images/googlelogo.png' height='20px' mr={4} />
                Continue with Facebook
            </Button>
            <Button variant='oauth'>
                Some Other Provider
            </Button>
            {error && (<Text>{error.message}</Text>)}
        </Flex>
    )
}

export default OAuthButtons