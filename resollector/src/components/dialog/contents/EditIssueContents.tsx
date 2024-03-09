import { styled } from 'styled-components';
import TextButton from '../../button/TextButton';
import FilledButton from '../../button/FilledButton';
import Box from '../../box/Box';
import TextFieldOutline from '../../textField/TextFieldOutline';
import { useState } from 'react';
import themeColor from '../../../utils/themeColor';
import TextAreaOutline from '../../textField/TextAreaOutline';

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
    issueId: string
}

function EditIssueContents(props: Props) {
    const [titleValue, setTitleValue] = useState<string>(props.issueTitle);
    const [URLValue, setURLValue] = useState<string>(props.issueURL);
    const [noteValue, setNoteValue] = useState<string>(props.issueNote);


    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>): void {
            setTitleValue(e.target.value);
    }

    function handleURLChange(e: React.ChangeEvent<HTMLInputElement>): void {
            setURLValue(e.target.value);
    }

    function handleNoteChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
            setNoteValue(e.target.value);
    }

    function handleCancel(): void {
            setTitleValue(props.issueTitle);
            setURLValue(props.issueURL);
            setNoteValue(props.issueNote);
            if(props.onClick){
            props.onClick();
            }
    }

    function handleSubmit(): void {
        //送信処理
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
            />
         <TextFieldOutline
            mode={props.mode}
            width="80%"
            height="3rem"
            top="11rem"
            left="10%"
            name="issueurl"
            value={URLValue}
            placeholder="Issue URL"
            onChange={handleURLChange}
            type="url"
            labelColorLight={themeColor.light.surfaceContainerHigh}
            labelColorDark={themeColor.dark.surfaceContainerHigh}
            />
        <TextAreaOutline
            mode={props.mode}
            cols={40}
            rows={10}
            width="80%"
            top="18rem"
            left="10%"
            name="issuenote"
            value={noteValue}
            placeholder="Note"
            onChange={handleNoteChange}
            labelColorLight={themeColor.light.surfaceContainerHigh}
            labelColorDark={themeColor.dark.surfaceContainerHigh}
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