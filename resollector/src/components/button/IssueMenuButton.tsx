import { styled, css } from 'styled-components';
import themeColor from '../../utils/themeColor';
import { useState, useRef, useEffect, useContext } from 'react';
import IssueMenuDialog from '../dialog/IssueMenuDialog';
import IssueMenu from '../dialog/contents/IssueMenu';
import { MdMoreHoriz } from 'react-icons/md';
import { RefetchIssuesContext } from '../../context/RefetchIssuesContext';

type ButtonProps = {
    mode: "light"|"dark",
    $isClicked: boolean,
}

const Button = styled.button<ButtonProps>`
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        position: relative;
        top: 10%;
        @media (max-width: 500px) {
            left: 85%;
        }
        @media (min-width: 501px) {
            left: 90%;
        }
        cursor: pointer;
        border: none;
        outline: none;
        overflow: hidden;
        background-color: transparent;
        ${props => {
            switch(true) {
                case (props.mode === "light") && !props.$isClicked:
                    return css`
                        &:hover {
                            &::before {
                                content: "";
                                background-color: ${themeColor.light.primary};
                                height: 100%;
                                width: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                                opacity: 8%;
                            }
                        }
                        color: ${themeColor.light.primary};
                    `
                case (props.mode === "light") && props.$isClicked:
                    return css`
                        &::before {
                            content: "";
                            background-color: ${themeColor.light.primary};
                            height: 100%;
                            width: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: 8%;
                        }
                        color: ${themeColor.light.primary};
                    `
                case (props.mode === "dark") && !props.$isClicked:
                    return css`
                        &:hover {
                            &::before {
                                content: "";
                                background-color: ${themeColor.dark.primary};
                                height: 100%;
                                width: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                                opacity: 8%;
                            }  
                        }
                        color: ${themeColor.dark.primary};
                    `
                case (props.mode === "dark") && props.$isClicked:
                    return css `
                        &::before {
                            content: "";
                            background-color: ${themeColor.dark.primary};
                            height: 100%;
                            width: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: 8%;
                        }
                        color: ${themeColor.dark.primary};
                    `
            }
        }}
`


type IssueMenuButtonProps = {
    mode: "light"|"dark",
    issueId: number,
    issueTitle: string,
    issueURL: string,
    issueNote: string,
    folderName: string,
}


function IssueMenuButton(props: IssueMenuButtonProps) {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [location, setLocation] = useState<Location>({locationTop: "", locationLeft: ""});
    const buttonRef = useRef<HTMLButtonElement>(null);
    const refetchIssues = useContext(RefetchIssuesContext);
    const [isRefetch, setIsRefetch] = useState<boolean>(false);

    useEffect(() => {
        if(isRefetch) {
            refetchIssues();
            setIsRefetch(false);
        } 
    }, [isRefetch, refetchIssues]);

    type Location = {
        locationTop: string,
        locationLeft: string,
    }

    function openClick(): void {
        if(dialogRef.current && buttonRef.current) {
            const targetRect = buttonRef.current.getBoundingClientRect();
            setLocation({
                locationTop: (targetRect.top + 25).toString(),
                locationLeft: (targetRect.left + 30).toString(),
            })
            dialogRef.current.showModal();
            setIsClicked(true);
        }
    }

    function closeDialog(): void {
        if(dialogRef.current) {
            dialogRef.current.close();
            setIsClicked(false);
            setIsRefetch(true);
        }
    }

    return(
        <>
        <Button
            mode={props.mode}
            $isClicked={isClicked}
            onClick={openClick}
            ref={buttonRef}>
            <MdMoreHoriz
                size={25}/>
        </Button>
        <IssueMenuDialog
            ref={dialogRef}
            onClick={closeDialog}>
            <IssueMenu
                mode={props.mode}
                top={location.locationTop}
                left={location.locationLeft}
                issueId={props.issueId}
                issueTitle={props.issueTitle}
                issueURL={props.issueURL}
                issueNote={props.issueNote}
                folderName={props.folderName}
                closeDialog={closeDialog}
                />
        </IssueMenuDialog>
        </>
    )
}

export default IssueMenuButton;