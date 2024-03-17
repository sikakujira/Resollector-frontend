import { styled } from 'styled-components';
import TextButton from './TextButton';
import AddFolderDialog from '../dialog/AddFolderDialog';
import AddFolderContents from '../dialog/contents/AddFolderContents';
import { useRef } from 'react';
import { MdAdd } from "react-icons/md";
import Box from '../box/Box';

type ButtonProps = {
    mode: "light"|"dark",
}

const Button = styled(TextButton)<ButtonProps>`
    width: 8rem;
    height: 2rem;
    bottom: 1rem;
    border-radius: 0.5rem;
    right: 2rem;
`
const AddIcon = styled(MdAdd)`
        position: absolute;
        top: 6px;
        left: 4px;
`

type AddFolderButtonProps = {
    mode: "light"| "dark",
}

function AddFolderButton(props: AddFolderButtonProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

        function openDialog(): void {
            if(dialogRef.current) {
                dialogRef.current.showModal();
            }
        }

        function closeDialog(): void {
            if(dialogRef.current) {
                dialogRef.current.close();
            }
        }

    return(
        <>
        <Button
            mode={props.mode}
            onClick={openDialog}
            >
            <AddIcon
                size={20}
                />
            <Box
                $left="30px"
                $top="7px">
                New Folder
            </Box>
        </Button>
        <AddFolderDialog
            mode={props.mode}
            ref={dialogRef}
            onClick={closeDialog}
            >
            <AddFolderContents
                mode={props.mode}
                close={closeDialog}
                />
        </AddFolderDialog>
        </>
    )
}

export default AddFolderButton;