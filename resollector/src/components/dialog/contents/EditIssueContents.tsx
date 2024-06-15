import { styled } from 'styled-components';
import TextButton from '../../button/TextButton';
import FilledButton from '../../button/FilledButton';
import Box from '../../box/Box';
import TextFieldOutline from '../../textField/TextFieldOutline';
import { useState, useEffect, useRef } from 'react';
import themeColor from '../../../utils/themeColor';
import TextAreaOutline from '../../textField/TextAreaOutline';
import  useFetch  from '../../../services/useFetch';
import getCookie from '../../../services/getCookie';


const ContentsPaper = styled.div`
        width: 100%;
        height: 100%;
    `
type Props = {
    mode: "light"|"dark",
    onClick?: () => void,
    issueTitle: string,
    issueURL: string,
    issueNote: string,
    issueId: number,
    folderName: string,
}

function EditIssueContents(props: Props) {
    const [titleValue, setTitleValue] = useState<string>(props.issueTitle);
    const [URLValue, setURLValue] = useState<string>(props.issueURL);
    const [noteValue, setNoteValue] = useState<string>(props.issueNote);
    const [folderValue, setFolderValue] = useState<string>(props.folderName);
    const [error, setError] = useState<ErrorMessage>({isError: false, title: "", folder: ""});
    const { onClick, issueTitle, issueURL, issueNote, folderName, issueId } = props;
    const effectRef = useRef<boolean>(false);

    type ErrorMessage = {
        isError: boolean,
        title: string,
        folder: string,
    }

    const option = {
        method: 'PUT',
        url: '/api/v1/issues',
        header: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        data: {
            id: issueId,
            title: titleValue,
            url: URLValue,
            folderName: folderValue,
            note: noteValue,
        }
    }

    type ErrorResponse = {
        title?: string,
        folder?: string,
    }

    const { response, error: errorResponse, sendRequest } = useFetch<any, ErrorResponse>(option);

    useEffect(() => {
        if(effectRef.current){
            if(response && response.status === 204) {
                setError({
                    isError: false,
                    title: "",
                    folder: "",
                })
                setTitleValue(issueTitle);
                setURLValue(issueURL);
                setNoteValue(issueNote);
                setFolderValue(folderName);
                if(onClick){
                onClick();
                }
                effectRef.current = false;
            }
        }
    },[response, onClick, issueTitle, issueURL, issueNote, folderName]);

    useEffect(() => {
        if(errorResponse && errorResponse.data) {
            setError({
                isError: true,
                title: errorResponse.data.title || "",
                folder: errorResponse.data.folder || "",
            });
        }
    }, [errorResponse]);

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>): void {
            setTitleValue(e.target.value);
    }

    function handleURLChange(e: React.ChangeEvent<HTMLInputElement>): void {
            setURLValue(e.target.value);
    }

    function handleNoteChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
            setNoteValue(e.target.value);
    }

    function handleFolderNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
            setFolderValue(e.target.value);
    }

    function handleCancel(): void {
            setError({
                isError: false,
                title: "",
                folder: "",
            })
            setTitleValue(props.issueTitle);
            setURLValue(props.issueURL);
            setNoteValue(props.issueNote);
            setFolderValue(props.folderName);
            if(props.onClick){
            props.onClick();
            }
    }

    function handleSubmit(): void {
        sendRequest();
        effectRef.current = true;
    }

    return(
        <ContentsPaper
            onClick={e => e.stopPropagation()}
            >
        <Box
            $color={props.mode}
            $top="2rem"
            $left="4rem"
            fontSize="24px"
            >
            Edit Issue
        </Box>
        <TextFieldOutline
            mode={props.mode}
            width="80%"
            height="3rem"
            top="5rem"
            left="10%"
            name="issuetitle"
            value={titleValue}
            placeholder="Title"
            onChange={handleTitleChange}
            type="text"
            labelColorLight={themeColor.light.surfaceContainerHigh}
            labelColorDark={themeColor.dark.surfaceContainerHigh}
            errorText={error.title}
            isError={error.isError}
            />
         <TextFieldOutline
            mode={props.mode}
            width="80%"
            height="3rem"
            top="11rem"
            left="10%"
            name="issueurl"
            value={URLValue}
            placeholder="URL"
            onChange={handleURLChange}
            type="url"
            labelColorLight={themeColor.light.surfaceContainerHigh}
            labelColorDark={themeColor.dark.surfaceContainerHigh}
            isError={error.isError}
            />
        <TextFieldOutline
            mode={props.mode}
            width="80%"
            height="3rem"
            top="17rem"
            left="10%"
            name="foldername"
            value={folderValue}
            placeholder="Folder Name"
            onChange={handleFolderNameChange}
            type="text"
            labelColorLight={themeColor.light.surfaceContainerHigh}
            labelColorDark={themeColor.dark.surfaceContainerHigh}
            errorText={error.folder}
            isError={error.isError}
            />
        <TextAreaOutline
            mode={props.mode}
            cols={40}
            rows={8}
            width="80%"
            top="23rem"
            left="10%"
            name="issuenote"
            value={noteValue}
            placeholder="Note"
            onChange={handleNoteChange}
            labelColorLight={themeColor.light.surfaceContainerHigh}
            labelColorDark={themeColor.dark.surfaceContainerHigh}
            isError={error.isError}
            />
        <TextButton
            height="2.5rem"
            width="7rem"
            bottom="2rem"
            right="12rem"
            content="Cancel"
            mode={props.mode}
            onClick={handleCancel}
            />
        <FilledButton
            height="2.5rem"
            width="7rem"
            bottom="2rem"
            right="3rem"
            content="Edit Issue"
            mode={props.mode}
            onClick={handleSubmit}
            />
        </ContentsPaper>
    )
}

export default EditIssueContents;