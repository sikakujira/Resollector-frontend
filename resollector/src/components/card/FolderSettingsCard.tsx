import { styled } from 'styled-components';
import themeColor from '../../utils/themeColor';
import TextButton from '../button/TextButton';
import { useRef } from 'react';
import AddFolderDialog from '../dialog/AddFolderDialog';
import AddFolderContents from '../dialog/contents/AddFolderContents';
import DeleteFolderDialog from '../dialog/DeleteFolderDialog';
import DeleteFolderContents from '../dialog/contents/DeleteFolderContents';
import EditFolderNameDialog from '../dialog/EditFolderNameDialog';
import EditFolderNameContents from '../dialog/contents/EditFolderNameContents';
import MoveFolderDialog from '../dialog/MoveFolderDialog';
import MoveFolderContents from '../dialog/contents/MoveFolderContents';
import { Folder } from '../../reducer/foldersReducer';

const Card = styled.div<{mode: "light"|"dark"}>`
    width: 8rem;
    height: 8rem;
    border-radius: 0.5rem;
    background-color: 
        ${props => props.mode === "light"
            ? `${themeColor.light.surfaceContainer}`
            : `${themeColor.dark.surfaceContainer}`};
    box-shadow: 1px 1px 6px -3px;
    display: flex;
    flex-direction: column;
   
`

const FolderSettingButton = styled(TextButton)<{mode:"light"|"dark"}>`
    width: 8rem;
    height: 2rem;
    border-radius: 0.5rem;
    font-size: 13px;
`

const ButtonBox = styled.div`
    width: 8rem;
    height: 2rem;
`

type FolderSettingsCardProps = {
    mode:"light"|"dark",
    folder: Folder,
    closeSettings: () => void,
}

function FolderSettingsCard(props: FolderSettingsCardProps) {
    const newFolderDialogRef = useRef<HTMLDialogElement>(null);
    const deleteFolderDialogRef = useRef<HTMLDialogElement>(null);
    const editFolderNameDialogRef = useRef<HTMLDialogElement>(null);
    const moveFolderDialogRef = useRef<HTMLDialogElement>(null);
    const { folder } = props;

    function openNewFolderDialog(): void {
        if(newFolderDialogRef.current) {
            newFolderDialogRef.current.showModal();
        }
    }

    function closeNewFolderDialog(): void {
        if(newFolderDialogRef.current) {
            newFolderDialogRef.current.close();
        }
    }

    function openDeleteFolderDialog(): void {
        if(deleteFolderDialogRef.current) {
            deleteFolderDialogRef.current.showModal();
        }
    }

    function closeDeleteFolderDialog(): void {
        if(deleteFolderDialogRef.current) {
            deleteFolderDialogRef.current.close();
        }
    }

    function openEditFolderNameDialog(): void {
        if(editFolderNameDialogRef.current) {
            editFolderNameDialogRef.current.showModal();
        }
    }

    function closeEditFolderNameDialog(): void {
        if(editFolderNameDialogRef.current) {
            editFolderNameDialogRef.current.close();
        }
    }

    function openMoveFolderDialog(): void {
        if(moveFolderDialogRef.current) {
            moveFolderDialogRef.current.showModal();
        }
    }

    function closeMoveFolderDialog(): void {
        if(moveFolderDialogRef.current) {
            moveFolderDialogRef.current.close();
        }
    }

    return(
        <Card
            mode={props.mode}
            onClick={e => e.stopPropagation()}>
        <ButtonBox>
             <FolderSettingButton
                mode={props.mode}
                onClick={openMoveFolderDialog}>
                Move Folder
            </FolderSettingButton>
        </ButtonBox>
        <ButtonBox>
             <FolderSettingButton
                mode={props.mode}
                onClick={openEditFolderNameDialog}>
                Rename
            </FolderSettingButton>
        </ButtonBox>
       <ButtonBox>
            <FolderSettingButton
                mode={props.mode}
                onClick={openDeleteFolderDialog}>
                Delete Folder
            </FolderSettingButton>
       </ButtonBox>
        <ButtonBox>
            <FolderSettingButton
                mode={props.mode}
                onClick={openNewFolderDialog}>
                New Folder
            </FolderSettingButton>
        </ButtonBox>
        <MoveFolderDialog
            mode={props.mode}
            ref={moveFolderDialogRef}
            onClick={closeMoveFolderDialog}>
            <MoveFolderContents
                mode={props.mode}
                closeDialog={closeMoveFolderDialog}
                closeSettings={props.closeSettings}
                folder={folder}
                />
        </MoveFolderDialog>
        <EditFolderNameDialog
            mode={props.mode}
            ref={editFolderNameDialogRef}
            onClick={closeEditFolderNameDialog}>
            <EditFolderNameContents
                mode={props.mode}
                closeDialog={closeEditFolderNameDialog}
                folder={folder}
                closeSettings={props.closeSettings}
                />
        </EditFolderNameDialog>
        <DeleteFolderDialog
            mode={props.mode}
            ref={deleteFolderDialogRef}
            onClick={closeDeleteFolderDialog}>
            <DeleteFolderContents
                mode={props.mode}
                closeDialog={closeDeleteFolderDialog}
                folderId={folder.id}
                closeSettings={props.closeSettings}
                />
        </DeleteFolderDialog>
        <AddFolderDialog
            mode={props.mode}
            ref={newFolderDialogRef}
            onClick={closeNewFolderDialog}>
            <AddFolderContents
                mode={props.mode}
                parent={folder.id}
                close={closeNewFolderDialog}
                closeSettings={props.closeSettings}
                />
        </AddFolderDialog> 
        </Card>
    )
}

export default FolderSettingsCard;