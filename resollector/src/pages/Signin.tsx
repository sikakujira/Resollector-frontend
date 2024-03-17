import TextFieldStandard from '../components/textField/TextFieldStandard';
import Background from '../components/background/Background';
import Box from '../components/box/Box';
import FilledButton from '../components/button/FilledButton';
import TextButton from '../components/button/TextButton';
import Header from '../components/header/Header';
import themeColor from '../utils/themeColor';
import { useState, useContext, useEffect } from 'react';
import  useFetch  from '../services/useFetch';
import { AuthDispatchContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SigninCard from '../components/card/SigninCard';
import getCookie from '../services/getCookie';

export default function Signin() {
        const [email, setEmail] = useState<string>("");
        const [password, setPassword] = useState<string>("");
        const [error, setError] = useState<Error>({
             isError: false, 
             emailError: "", 
             passwordError: "", 
        });
        const setIsAuthenticated = useContext(AuthDispatchContext);
        const [redirectHome, setRedirectHome] = useState<boolean>(false);

        const option = {
                method: 'POST',
                url: '/api/v1/signin',
                data: {
                    email: email,
                    password: password,
                },
                header: {
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                }
            }

        const { response, error: responseError, sendRequest } = useFetch<null, {errorMessage: string}>(option);
        const navigate = useNavigate();

        useEffect(() => {
            if(redirectHome) {
                navigate("/");
            }
        }, [redirectHome, navigate]);

        useEffect(() => {
            if(response && (response.status === 200)) {
                setError({
                    isError: false,
                    emailError: "",
                    passwordError: "",
                });
                setIsAuthenticated(true);
                setRedirectHome(true);
            }
        }, [response, setIsAuthenticated]);

        useEffect(() => {
                if(responseError && responseError.data.errorMessage) {
                    setError({
                        isError: true,
                        emailError: responseError.data.errorMessage,
                        passwordError: responseError.data.errorMessage
                    });
                } 
        }, [responseError]);
       
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

        function handleSubmit(): void {
            sendRequest(); 
        }

        function moveToSignUp(): void {
            navigate("/signup");
        }

        function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
            if(e.key === 'Enter') {
                sendRequest();
            }
        }
    
    return(
        <Background mode="light">
        <Header 
            mode="light" 
            login={false}
            />
        <SigninCard
            name="signinCard"
            $center="true"
            >
        <Box 
            $top="4rem" 
            $left="40%" 
            $color={`${themeColor.light.primary}`} 
            fontSize="30px">
                Sign in
        </Box>
        <TextFieldStandard 
            name="useremail"
            type="email"
            placeholder="Email"
            top="8rem"
            left="20%"
            width="60%"
            mode="light"
            value={email}
            onChange={handleEmailChange}
            error={error.isError.toString()}
            errorText={error.emailError}
            onKeyDown={handleKeyDown}
            />
        <TextFieldStandard 
            name="userpassword"
            type="password"
            placeholder="Password"
            top="16rem"
            left="20%"
            width="60%"
            mode="light"
            value={password}
            onChange={handlePasswordChange}
            error={error.isError.toString()}
            errorText={error.passwordError}
            onKeyDown={handleKeyDown}
            />
        <TextButton 
            width="7rem"
            height="2.5rem"
            top="26rem"
            left="10%"
            mode="light"
            content="Sign up"
            onClick={moveToSignUp}
            />
        <FilledButton
            width="7rem"
            height="2.5rem"
            top="26rem"
            right="10%"
            mode="light"
            content="Sign in"
            onClick={handleSubmit}
            />
        </SigninCard>
        </Background>
    )
}
