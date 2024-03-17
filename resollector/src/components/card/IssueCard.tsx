import { styled } from 'styled-components';
import themeColor from '../../utils/themeColor';
import IssueElevatedCard from './IssueElevatedCard';
import Box from '../box/Box';
import { MdArrowDownward } from "react-icons/md";
<<<<<<< HEAD
import { useState } from "react";
import IssueNote from './IssueNote';
import IssueMenuButton from '../button/IssueMenuButton';
=======
import { useState, useRef } from "react";
import IssueNote from './IssueNote';
import FilledButton from '../button/FilledButton';
import EditIssueDialog from '../dialog/EditIssueDialog';
import EditIssueContents from '../dialog/contents/EditIssueContents';
>>>>>>> 9abf34c (フォルダ機能前)

const Card = styled.div`
    margin: 0 auto 1rem;
    width: 100%;
    height: 5rem;
`
<<<<<<< HEAD


type IssueCardProps = {
    mode: "light"|"dark",
    issueId: number,
    issueTitle: string,
    issueURL: string,
    issueNote: string,
    folderName: string,
=======
const EditButton = styled(FilledButton)`
    position: relative;
    top: 1.5rem;
    @media (min-width: 651px) {
        left: 75%;
    }
    @media (min-width: 501px) and (max-width: 650px) {
        left: 70%
    }
    @media (max-width: 500px) {
        left: 60%;
    }
`

type IssueCardProps = {
    mode: "light"|"dark",
    issueId: string,
    issueTitle: string,
    issueURL: string,
    issueNote: string,
>>>>>>> 9abf34c (フォルダ機能前)
}

function IssueCard(props: IssueCardProps) {
    const [isHoverd, setIsHoverd] = useState<boolean>(false);
<<<<<<< HEAD
=======
    const dialogRef = useRef<HTMLDialogElement>(null);
>>>>>>> 9abf34c (フォルダ機能前)

    function handleMouseEnter(): void {
        setIsHoverd(true);
    }

    function handleMouseLeave(): void {
        setIsHoverd(false);
    }

<<<<<<< HEAD
=======
    function handleEditButton(): void {
          if(dialogRef.current) {
            dialogRef.current.showModal();
          }
    }

    function closeDialog(): void {
        if(dialogRef.current) {
            dialogRef.current.close();
        }
    }
>>>>>>> 9abf34c (フォルダ機能前)

    return(
        <Card>
        <IssueElevatedCard
            mode={props.mode}
            issueURL={props.issueURL}>
            <Box
                $color={props.mode}
                $top="2rem"
                $left="2rem"
                width="50%"
                fontSize="20px"
                >
                {props.issueTitle}
            </Box>
            <Box
                $top="3rem"
                $right="0.1rem"
                width="2rem"
                height="2rem"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >
                {props.mode === "light" 
                ? <MdArrowDownward
                    color={themeColor.light.primary}
                    size={20}
                    />
                : <MdArrowDownward
                    color={themeColor.dark.primary}
                    size={20}
                    />}
            </Box>   
        </IssueElevatedCard> 
<<<<<<< HEAD
            <IssueMenuButton
                mode={props.mode}
                issueId={props.issueId}
                issueTitle={props.issueTitle}
                issueURL={props.issueURL}
                issueNote={props.issueNote}
                folderName={props.folderName}
=======
            <EditButton
                width="5rem"
                height="2rem"
                mode={props.mode}
                content="編集"
                onClick={handleEditButton}
>>>>>>> 9abf34c (フォルダ機能前)
                />
            {isHoverd
                ? <IssueNote
                        mode={props.mode}
                        className="issuenote">
                    {props.issueNote}
                   </IssueNote>
                : null
            }
<<<<<<< HEAD
=======
            <EditIssueDialog
                mode={props.mode}
                ref={dialogRef}
                onClick={closeDialog}
                >
                <EditIssueContents
                    mode={props.mode}
                    onClick={closeDialog}
                    issueTitle={props.issueTitle}
                    issueURL={props.issueURL}
                    issueNote={props.issueNote}
                    issueId={props.issueId}
                    />
            </EditIssueDialog>
>>>>>>> 9abf34c (フォルダ機能前)
        </Card>
    )
}

export default IssueCard;