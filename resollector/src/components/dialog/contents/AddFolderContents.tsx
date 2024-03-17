import { styled } from 'styled-components';
import themeColor from '../../../utils/themeColor';
import FilledButton from '../../button/FilledButton';
import TextButton from '../../button/TextButton';
import TextFieldOutline from '../../textField/TextFieldOutline';
import Box from '../../box/Box';
import { useState, useEffect } from 'react';
import useFetch from '../../../services/useFetch';
import getCookie from '../../../services/getCookie';
import useFetchFolders from '../../../services/useFetchFolders';

const ContentsPaper = styled.div`
    width: 100%;
    height: 100%;
`

type AddFolderContentsProps = {
    mode: "light"|"dark",
    parent?: number,
    close: () => void,
    closeSettings?: () => void,
}

function AddFolderContents(props: AddFolderContentsProps) {
    const [value, setValue] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const fetchFolders = useFetchFolders();
    const { close, closeSettings } = props;
    const [isRefetch, setIsRefetch] = useState<boolean>(false);

    const options = {
        method: 'POST',
        url: '/api/v1/folders',
        header: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        },
        data: {
            name: value,
            parentId: props.parent,
        },
    }

    type Request = {
        name: string,
        parentId: number,
    }

    type Response = {
        name: string,
    }

    const { response, error, sendRequest } = useFetch<Request, Response>(options);

    useEffect(() => {
        if(isRefetch) {
            if(response && (response.status === 201)) {
                setValue("");
                fetchFolders();
                setIsError(false);
                setErrorMessage("");
                close();
                if(closeSettings) {
                     closeSettings();
                }
                setIsRefetch(false);
            }
        }
    }, [response, fetchFolders, close, closeSettings, isRefetch]);

    useEffect(() => {
        if(error && error.data) {
            setIsError(true);
            setErrorMessage(error.data.name);
        }
    }, [error])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value);
    }

    function handleCancel(): void {
        setIsError(false);
        setErrorMessage("");
        setValue("");
        close();
    }

    function handleSubmit(): void {
        sendRequest();
        setIsRefetch(true);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
        if(e.key === 'Enter') {
            handleSubmit();
        }
    }

    return(
        <ContentsPaper
            onClick={e => e.stopPropagation()}>
            <Box
                $top="3rem"
                $left="2rem"
                $color={props.mode}>
                New Folder
            </Box>
            <TextFieldOutline
                mode={props.mode}
                width="15rem"
                height="3rem"
                top="6rem"
                left="2.5rem"
                name="newfolder"
                value={value}
                onChange={handleChange}
                type="text"
                placeholder="Folder Name"
                labelColorLight={themeColor.light.surfaceContainerHigh}
                labelColorDark={themeColor.dark.surfaceContainerHigh}
                isError={isError}
                errorText={errorMessage}
                onKeyDown={handleKeyDown}
                errorBottom="-3.3rem"
                />
            <TextButton
                mode={props.mode}
                bottom="1rem"
                right="8rem"
                onClick={handleCancel}
                width="5rem"
                height="2rem"
                >
                Cancel
            </TextButton>
            <FilledButton
                mode={props.mode}
                bottom="1rem"
                right="2rem"
                width="5rem"
                height="2rem"
                onClick={handleSubmit}
                >
                OK
            </FilledButton>
        </ContentsPaper>
    )
}

export default AddFolderContents;