import { styled } from 'styled-components';
import Box from '../../box/Box';
import FilledButton from '../../button/FilledButton';
import TextButton from '../../button/TextButton';
import TextFieldOutline from '../../textField/TextFieldOutline';
import themeColor from '../../../utils/themeColor';
import { useState, useEffect, useContext } from 'react';
import useFetch from '../../../services/useFetch';
import { useNavigate } from 'react-router-dom';
import { AuthDispatchContext } from '../../../context/AuthContext';

const DialogCard = styled.div`
        width: 100%;
        height: 100%;
`

type Props = {
    mode: "light"| "dark",
    closeDialog: () => void,
}

function AccountDeleteConfirmPassword(props: Props) {
    const [value, setValue] = useState<string>("");
    const navigate = useNavigate();
    const setIsAuthenticated = useContext(AuthDispatchContext);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const option = {
        method: 'DELETE',
        url: '/api/v1/user',
        data: {
            password: value
        }
    }

    type Request = {
        password: string,
    }

    type Response = {
        errorMessage: string,
    }

    const { response, error, sendRequest } = useFetch<Request, Response>(option);

    useEffect(() => {
        if(response && (response.status === 204)) {
            setIsError(false);
            setErrorMessage("");
            navigate('/signin');
            setIsAuthenticated(false);
        }
    },[response, navigate, setIsAuthenticated]);

    useEffect(() => {
        if(error && error.data) {
            setIsError(true);
            setErrorMessage(error.data.errorMessage);
        }
    }, [error]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value);
    }

    function cancel(): void {
        setIsError(false);
        setErrorMessage("");
        setValue("");
        props.closeDialog();
    }
    

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
        if(e.key === 'Enter') {
            sendRequest();
        }
    }

    function handleAccountDeleteButton(): void {
        sendRequest();
    }

    return(
        <DialogCard
            onClick={e => e.stopPropagation()}
            >
        <Box
            $color={props.mode}
            $top="3rem"
            $left="2rem"
            >
            パスワードを入力してください
        </Box>
        <TextFieldOutline
            mode={props.mode}
            width="20rem"
            height="2.5rem"
            top="7rem"
            left="10%"
            name="accountdeletepassword"
            value={value}
            placeholder="Password"
            onChange={handleChange}
            type="password"
            labelColorLight={themeColor.light.surfaceContainerHigh}
            labelColorDark={themeColor.dark.surfaceContainerHigh}
            labelTop="0.7rem"
            isError={isError}
            errorText={errorMessage}
            onKeyDown={handleKeyDown}
            />
        <TextButton
            top="13rem"
            left="40%"
            width="6rem"
            height="2.5rem"
            mode={props.mode}
            content="Cancel"
            onClick={cancel}
            />
        <FilledButton
            top="13rem"
            left="70%"
            width="6rem"
            height="2.5rem"
            mode={props.mode}
            content="Delete"
            onClick={handleAccountDeleteButton}
            />

        </DialogCard>
    )
}

export default AccountDeleteConfirmPassword;