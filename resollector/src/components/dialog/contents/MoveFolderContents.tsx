import Box from '../../box/Box';
import TextFieldOutline from '../../textField/TextFieldOutline';
import FilledButton from '../../button/FilledButton';
import TextButton from '../../button/TextButton';
import themeColor from '../../../utils/themeColor';
import React, { useState, useEffect } from 'react';
import { Folder } from '../../../reducer/foldersReducer';
import useFetch from '../../../services/useFetch';
import useFetchFolders from '../../../services/useFetchFolders';

type MoveFolderContentsProps = {
    mode:"light"|"dark",
    closeDialog: () => void,
    closeSettings: () => void,
    folder: Folder,
}

function MoveFolderContents(props: MoveFolderContentsProps) {
    const [value, setValue] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const fetchFolders = useFetchFolders();
    const { folder, closeDialog, closeSettings } = props;
    const [isResponseEffect, setIsResponseEffect] = useState<boolean>(false);

    const option = {
        method: 'PUT',
        url: '/api/v1/folders/move',
        data: {
            id: folder.id,
            parentName: value || null,
        }
    }

    type Request = {
        id: number,
        parentName: string,
    }

    type Response = {
        name: string,
    }

    const { response, error, sendRequest } = useFetch<Request, Response>(option);
    
    useEffect(() => {
        if(isResponseEffect) {
            if(response && (response.status === 204)) {
                setIsError(false);
                setErrorMessage("");
                closeDialog();
                closeSettings();
                fetchFolders();
                setIsResponseEffect(false);
            }
        }
    },[response, isResponseEffect, fetchFolders, closeDialog, closeSettings]);

    useEffect(() => {
        if(error && error.data.name) {
            setIsError(true);
            setErrorMessage(error.data.name);
        }
    }, [error]);
    

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value);
    }

    function handleCancel(): void {
        setValue("");
        setIsError(false);
        setErrorMessage("");
        props.closeDialog();
    } 

    function handleMove(): void {
        setIsResponseEffect(true);
        sendRequest();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
        if(e.key === 'Enter') {
            handleMove();
        }
    }

    return(
        <Box
            width="20rem"
            height="16rem"
            onClick={e => e.stopPropagation()}>
                <Box
                    $top="1rem"
                    $left="5%"
                    $color={props.mode}>
                    移動先のフォルダ名を指定してください<br/>このフォルダ配下のフォルダとIssueも移動します<br/>空欄の場合はルートに移動します
                </Box>
                <TextFieldOutline
                    mode={props.mode}
                    height="3rem"
                    width="15rem"
                    top="7.5rem"
                    left="7%"
                    name="editfoldername"
                    value={value}
                    onChange={handleChange}
                    placeholder="Folder Name"
                    type="text"
                    labelColorLight={themeColor.light.surfaceContainerHigh}
                    labelColorDark={themeColor.dark.surfaceContainerHigh}
                    isError={isError}
                    errorText={errorMessage}
                    onKeyDown={handleKeyDown}
                    />
                <TextButton
                    right="40%"
                    bottom="5px"
                    width="6rem"
                    height="2.3rem"
                    mode={props.mode}
                    onClick={handleCancel}
                    >
                    Cancel
                </TextButton>
                <FilledButton
                    right="5%"
                    bottom="5px"
                    width="6rem"
                    height="2.3rem"
                    mode={props.mode}
                    onClick={handleMove}>
                    Move
                </FilledButton>
        </Box>
    )
}

export default MoveFolderContents;