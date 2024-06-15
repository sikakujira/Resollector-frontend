import { styled } from 'styled-components';
import themeColor from '../../utils/themeColor';
import IssueElevatedCard from './IssueElevatedCard';
import Box from '../box/Box';
import { MdArrowDownward } from "react-icons/md";
import { useState } from "react";
import IssueNote from './IssueNote';
import IssueMenuButton from '../button/IssueMenuButton';

const Card = styled.div`
    margin: 0 auto 1rem;
    width: 100%;
    height: 5rem;
`

type IssueCardProps = {
    mode: "light"|"dark",
    issueId: number,
    issueTitle: string,
    issueURL: string,
    issueNote: string,
    folderName: string,

}

function IssueCard(props: IssueCardProps) {
    const [isHoverd, setIsHoverd] = useState<boolean>(false);

    function handleMouseEnter(): void {
        setIsHoverd(true);
    }

    function handleMouseLeave(): void {
        setIsHoverd(false);
    }

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
            <IssueMenuButton
                mode={props.mode}
                issueId={props.issueId}
                issueTitle={props.issueTitle}
                issueURL={props.issueURL}
                issueNote={props.issueNote}
                folderName={props.folderName}
                />
            {isHoverd
                ? <IssueNote
                        mode={props.mode}
                        className="issuenote">
                    {props.issueNote}
                   </IssueNote>
                : null
            }
        </Card>
    )
}

export default IssueCard;