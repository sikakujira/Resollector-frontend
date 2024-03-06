import TextFieldStandard from '../components/textField/TextFieldStandard';
import CardOutlined from '../components/card/CardOutlined';
import Background from '../components/background/Background';
import Box from '../components/box/Box';
import FilledButton from '../components/button/FilledButton';
import TextButton from '../components/button/TextButton';
import Header from '../components/header/Header';
import themeColor from '../utils/themeColor';
import { useState, useEffect } from 'react';

export default function Signin() {
        const [email, setEmail] = useState<string>("");
        const [password, setPassword] = useState<string>("");
        const [error, setError] = useState<Error>({
             isError: false, 
             emailError: "", 
             passwordError: "", 
        });
        useEffect(() => {
        //dummy
            const dummy: Error = {
                isError: true,
                emailError: "email dummy message",
                passwordError: "password dummy message",
            }
            setError(dummy);
        }, [])

        type Error = {
            isError: boolean,
            emailError: string,
            passwordError: string,
        }

        function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
             setEmail(e.target.value);
        }
       
        function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
            setPassword(e.target.value);
        }
    
    return(
        <Background mode="light">
        <Header 
            mode="light" 
            login={false}
            />
        <CardOutlined 
            name="sininCard" 
            width="35rem" 
            height="30rem" 
            $center="true"
            >
        <Box 
            $top="4rem" 
            $left="14rem" 
            $color={`${themeColor.light.primary}`} 
            fontSize="30px">
                Sign in
        </Box>
        <TextFieldStandard 
            name="useremail"
            type="email"
            placeholder="Email"
            top="8rem"
            left="7rem"
            mode="light"
            value={email}
            onChange={handleEmailChange}
            error={error.isError.toString()}
            errorText={error.emailError}
            />
        <TextFieldStandard 
            name="userpassword"
            type="password"
            placeholder="Password"
            top="16rem"
            left="7rem"
            mode="light"
            value={password}
            onChange={handlePasswordChange}
            error={error.isError.toString()}
            errorText={error.passwordError}
            />
        <TextButton 
            width="7rem"
            height="2.5rem"
            top="26rem"
            left="5rem"
            mode="light"
            content="Sign up"
            />
        <FilledButton
            width="7rem"
            height="2.5rem"
            top="26rem"
            left="23rem"
            mode="light"
            content="Sign in"
            />
        </CardOutlined>
        </Background>
    )
}
