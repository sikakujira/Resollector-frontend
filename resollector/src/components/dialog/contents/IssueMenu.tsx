import { styled, css } from 'styled-components';
import themeColor from '../../../utils/themeColor';
import TextButton from '../../button/TextButton';
import EditIssueDialog from '../EditIssueDialog';
import EditIssueContents from './EditIssueContents';
import { useRef, useContext, useEffect } from 'react';
import { RefetchIssuesContext } from '../../../context/RefetchIssuesContext'; 
import useFetch from '../../../services/useFetch';
import getCookie from '../../../services/getCookie';

type MenuCardProps = {
    mode: "light"|"dark",
    $top: string,
    $left: string,
}

const MenuCard = styled.div<MenuCardProps>`
    width: 8rem;
    height: auto;
    position: absolute;
    border-radius: .5rem;
    top: ${props => props.$top}px;
    left: ${props => props.$left}px;
    display: flex;
    flex-direction: column;
    ${props => {
        if(props.mode === "light") {
            return css`
                background-color: ${themeColor.light.surfaceContainer};
                box-shadow: 2px 3px 6px -5px;
            `
        } else {
            return css`
                background-color: ${themeColor.dark.surfaceContainer};
            `
        }
    }}
`

const MenuButton = styled(TextButton)`
    width: 8rem;
    height: 2rem;
    border-radius: 0.5rem;
    font-size: 13px;
`
const ButtonBox = styled.div`
    width: 8rem;
    height: 2rem;
`


type IssueMenuProps = {
    mode: "light"|"dark",
    top: string,
    left: string,
    issueId: number,
    issueTitle: string,
    issueURL: string,
    issueNote: string,
    folderName: string,
    closeDialog: () => void,
}

function IssueMenu(props: IssueMenuProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const refetchIssues = useContext(RefetchIssuesContext);

    const option = {
        method: 'DELETE',
        url: '/api/v1/issues',
        header: { 
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            'Content-Type': 'application/json'
        },
        data: props.issueId 
    }

    const { response, sendRequest } = useFetch(option);

    useEffect(() => {
        if(response && (response.status === 204)) {
            refetchIssues();
        }
    }, [response, refetchIssues]);

    function openDialog(): void {
        if(dialogRef.current) {
            dialogRef.current.showModal();
        }
    }
    //編集のモーダルを閉じるときにメニューのモーダルも閉じる
    function closeDialog(): void {
        if(dialogRef.current) {
            dialogRef.current.close();
        }
        props.closeDialog();
    }

    function handleDelete(): void {
        sendRequest();
        closeDialog();
    }

    return(
    <MenuCard
        mode={props.mode}
        onClick={e => e.stopPropagation()}
        $top={props.top}
        $left={props.left}>
        <ButtonBox>
            <MenuButton
                mode={props.mode}
                onClick={openDialog}>
                Edit Issue
            </MenuButton>
        </ButtonBox>
        <ButtonBox>
            <MenuButton
                mode={props.mode}
                onClick={handleDelete}>
                Delete Issue
            </MenuButton>
        </ButtonBox>
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
                    folderName={props.folderName}
                    />
        </EditIssueDialog>
    </MenuCard>
    )
}

export default IssueMenu;