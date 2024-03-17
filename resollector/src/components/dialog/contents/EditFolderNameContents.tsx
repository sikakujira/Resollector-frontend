import Box from '../../box/Box';
import TextFieldOutline from '../../textField/TextFieldOutline';
import FilledButton from '../../button/FilledButton';
import TextButton from '../../button/TextButton';
import themeColor from '../../../utils/themeColor';
import { useState, useEffect } from 'react';
import useFetch from '../../../services/useFetch';
import getCookie from '../../../services/getCookie';
import useFetchFolders from '../../../services/useFetchFolders';
import { Folder } from '../../../reducer/foldersReducer';


type EditFolderContentsProps = {
    mode:"light"|"dark",
    closeDialog: () => void,
    folder: Folder,
    closeSettings: () => void,
}

function EditFolderNameContents(props: EditFolderContentsProps) {
    const { folder, closeDialog, closeSettings } = props;
    const [value, setValue] = useState<string>(folder.name);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const fetchFolders = useFetchFolders();
    const [isResponse, setIsResponse] = useState<boolean>(false);

    const option = {
        method: 'PUT',
        url: '/api/v1/folders',
        header: {
            'Content-Type': 'application/json',
            'X-XSRF-Token': getCookie('XSRF-TOKEN'),
        },
        data: {
            id: folder.id,
            name: value,
            parentId: folder.parentId,
            uid: folder.uid,
        }
    }

    type Request = {
        id: number,
        name: string,
        parentId: number | null,
        uid: number
    }

    type Response = {
        name: string,
    }

    const { response, error, sendRequest} = useFetch<Request, Response>(option);

    useEffect(() => {
        if(isResponse) {
            if(response && (response.status === 204)) {
                setIsError(false);
                setErrorMessage("");
                closeDialog();
                closeSettings();
                fetchFolders();
                setIsResponse(false);
            }
        }
    }, [response, closeDialog, closeSettings, fetchFolders, isResponse]);

    useEffect(() => {
        if(error && error.data) {
            setIsError(true);
            setErrorMessage(error.data.name);
        }
    }, [error]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value);
    }

    function handleCancel(): void {
        setIsError(false);
        setErrorMessage("");
        setValue(folder.name);
        closeDialog();
    } 

    function handleEdit(): void {
        sendRequest();
        setIsResponse(true);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
        if(e.key === 'Enter') {
            handleEdit();
        }
    }

    return(
        <Box
            width="20rem"
            height="12rem"
            onClick={e => e.stopPropagation()}>
                <Box
                    $top="1rem"
                    $left="5%"
                    $color={props.mode}>
                    Edit Folder Name
                </Box>
                <TextFieldOutline
                    mode={props.mode}
                    height="3rem"
                    width="15rem"
                    top="3.5rem"
                    left="7%"
                    name="editfoldername"
                    value={value}
                    onChange={handleChange}
                    placeholder="Folder Name"
                    type="text"
                    labelColorLight={themeColor.light.surfaceContainerHigh}
                    labelColorDark={themeColor.dark.surfaceContainerHigh}
                    onKeyDown={handleKeyDown}
                    isError={isError}
                    errorText={errorMessage}
                    errorBottom="-2.5rem"
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
                    onClick={handleEdit}>
                    Edit
                </FilledButton>
        </Box>
    )
}

export default EditFolderNameContents;