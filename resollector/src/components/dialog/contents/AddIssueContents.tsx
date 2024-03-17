import { styled } from 'styled-components';
import TextButton from '../../button/TextButton';
import FilledButton from '../../button/FilledButton';
import Box from '../../box/Box';
import TextFieldOutline from '../../textField/TextFieldOutline';
import { useState, useEffect, useContext } from 'react';
import themeColor from '../../../utils/themeColor';
import TextAreaOutline from '../../textField/TextAreaOutline';
import useFetch from '../../../services/useFetch';
import getCookie from '../../../services/getCookie';
import { RefetchIssuesContext } from '../../../context/RefetchIssuesContext';

const ContentsPaper = styled.div`
        width: 100%;
        height: 100%;
    `
type Props = {
    mode: "light"|"dark",
    onClick: () => void,
}

function AddIssueContents(props: Props) {
    const [titleValue, setTitleValue] = useState<string>("");
    const [URLValue, setURLValue] = useState<string>("");
    const [noteValue, setNoteValue] = useState<string>("");
    const [folderValue, setFolderValue] = useState<string>("");
    const [error, setError] = useState<ErrorMessage>({isError: false, title: "", folder: ""});
    const { onClick } = props;
    const refetchIssues = useContext(RefetchIssuesContext);

    type ErrorMessage = {
        isError: boolean,
        title: string,
        folder: string,
    }

    type ErrorResponse = {
        title?: string,
        folder?: string,
    }

    const option = {
        method: 'POST',
        url: '/api/v1/issues',
        header: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        data: {
            title: titleValue,
            url: URLValue,
            folderName: folderValue,
            note: noteValue,
        }
    }

    const { response, error: responseError, sendRequest} = useFetch<any, ErrorResponse>(option);

    useEffect(() => {
        if(responseError && responseError.data) {
            setError({
                isError: true,
                title: responseError.data.title || "",
                folder: responseError.data.folder|| "",
            });
        }
    }, [responseError]);

    useEffect(() => {
        if(response && (response.status === 201)){
            setError({
                isError: false,
                title: "",
                folder: "",
            });
            setTitleValue("");
            setURLValue("");
            setNoteValue("");
            setFolderValue("");
            if(onClick){
                onClick();
            }
            refetchIssues();
        }
    }, [response, onClick, refetchIssues]);

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>): void {
            setTitleValue(e.target.value);
    }

    function handleURLChange(e: React.ChangeEvent<HTMLInputElement>): void {
            setURLValue(e.target.value);
    }

    function handleNoteChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
            setNoteValue(e.target.value);
    }

    function handleFolderChange(e: React.ChangeEvent<HTMLInputElement>): void {
            setFolderValue(e.target.value);
    }

    
    function handleCancel(): void {
        setError({
            isError: false,
            title: "",
            folder: "",
        })
         setTitleValue("");
            setURLValue("");
            setNoteValue("");
            setFolderValue("");
            if(onClick){
                onClick();
            }
    }

    function handleSubmit(): void {
        sendRequest();
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
            New Issue
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
            isError={error.isError}
            errorText={error.title}
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
            onChange={handleFolderChange}
            type="text"
            labelColorLight={themeColor.light.surfaceContainerHigh}
            labelColorDark={themeColor.dark.surfaceContainerHigh}
            isError={error.isError}
            errorText={error.folder}
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
            content="Add Issue"
            mode={props.mode}
            onClick={handleSubmit}
            />
        </ContentsPaper>
    )
}

export default AddIssueContents;