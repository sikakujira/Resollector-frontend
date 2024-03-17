import TextFieldStandard from '../components/textField/TextFieldStandard';
import Background from '../components/background/Background';
import Box from '../components/box/Box';
import FilledButton from '../components/button/FilledButton';
import TextButton from '../components/button/TextButton';
import Header from '../components/header/Header';
import themeColor from '../utils/themeColor';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../services/useFetch';
import { AuthDispatchContext, AuthContext } from '../context/AuthContext';
import SignupCard  from '../components/card/SignupCard';
import getCookie from '../services/getCookie';

export default function Signup() {
        const [email, setEmail] = useState<string>("");
        const [password, setPassword] = useState<string>("");
        const [confirmPassword, setConfirmPassword] = useState<string>("");
        const [error, setError] = useState<Error>({
             isError: false, 
             emailError: "", 
             passwordError: "", 
             confirmPasswordError: ""
        });
        const setIsAuthenticated = useContext(AuthDispatchContext);
        const isAuthenticated = useContext(AuthContext);
        const navigate = useNavigate();

        const option = {
            method: 'POST',
            url: '/api/v1/signup',
            data: {
                email: email,
                password: password,
            },
            header: {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            }
        }

        type ErrorResponse = {
            email?: string,
            password?: string,
            userExists?: string,
        }

        const { response, error: responseError, sendRequest} = useFetch<null, ErrorResponse>(option);

        useEffect(() => {
            if(isAuthenticated) {
                navigate("/");
            }
        }, [isAuthenticated, navigate]);

        useEffect(() => {
            if(response && (response.status === 201)) {
                setIsAuthenticated(true);
                setError({
                    isError: false,
                    emailError: "",
                    passwordError: "",
                    confirmPasswordError: ""
                });
            }
        }, [response, setIsAuthenticated]);

        useEffect(() => {
            if(responseError) {
                setError((prevError) => ({
                    isError: true,
                    emailError: responseError.data.email || responseError.data.userExists || "",
                    passwordError: responseError.data.password || "",
                    confirmPasswordError: prevError.confirmPasswordError
                }));
            }
        }, [responseError]);
       

        type Error = {
            isError: boolean,
            emailError: string,
            passwordError: string,
            confirmPasswordError: string,
        }

        function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
             setEmail(e.target.value);
        }
       
        function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
            setPassword(e.target.value);
        }

        function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
            setConfirmPassword(e.target.value);
        }

        function handleSubmit(): void {
            if(password !== confirmPassword) {
                setError({
                    isError: true,
                    emailError: "",
                    passwordError: "",
                    confirmPasswordError: "パスワードが異なっています"
                });
                return;
            }

            sendRequest();
        }

        function moveToSignIn(): void {
            navigate('/signin');
        }

        function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
            if(e.key === 'Enter') {
                handleSubmit();
            }
        }

    
    return(
        <Background mode="light">
        <Header 
            mode="light" 
            login={false}
            />
        <SignupCard
            name="signupCard"
            $center="true"
            >
        <Box 
            $top="4rem" 
            $left="40%" 
            $color={`${themeColor.light.primary}`} 
            fontSize="30px">
                Sign up
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
            top="14rem"
            left="20%"
            width="60%"
            mode="light"
            value={password}
            onChange={handlePasswordChange}
            error={error.isError.toString()}
            errorText={error.passwordError}
            onKeyDown={handleKeyDown}
            />
        <TextFieldStandard 
            name="confirmpassword"
            type="password"
            placeholder="Confirm password"
            top="20rem"
            left="20%"
            width="60%"
            mode="light"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={error.isError.toString()}
            errorText={error.confirmPasswordError}
            onKeyDown={handleKeyDown}
            />
        <TextButton 
            width="7rem"
            height="2.5rem"
            top="26rem"
            left="10%"
            mode="light"
            content="Sign in"
            onClick={moveToSignIn}
            />
        <FilledButton
            width="7rem"
            height="2.5rem"
            top="26rem"
            right="10%"
            mode="light"
            content="Sign up"
            onClick={handleSubmit}
            />
        </SignupCard>
        </Background>
    )
}