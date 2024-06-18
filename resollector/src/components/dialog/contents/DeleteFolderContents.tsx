import TextButton from '../../button/TextButton';
import FilledButton from '../../button/FilledButton';
import Box from '../../box/Box';
import useFetch from '../../../services/useFetch';
import { useEffect, useState } from 'react';
import useFetchFolders from '../../../services/useFetchFolders';


type DeleteFolderContentsProps = {
    mode: "light"|"dark",
    closeDialog: () => void,
    folderId: number,
    closeSettings: () => void,
}

function DeleteFolderContents(props: DeleteFolderContentsProps) {
    const [isEffect, setIsEffect] = useState<boolean>(false);
    const { closeDialog, closeSettings } = props;
    const fetchFolders = useFetchFolders();

    const option = {
        method: 'DELETE',
        url: '/api/v1/folders',
        data: props.folderId,
    }

    const { response, sendRequest} = useFetch(option);

    useEffect(() => {
        if(isEffect) {
            if(response && (response.status === 204)) {
                closeDialog();
                closeSettings();
                fetchFolders();
                setIsEffect(false);
            }
        }
    }, [response, isEffect, closeDialog, closeSettings, fetchFolders]);
    
    function handleCancel(): void {
        closeDialog();
    }

    function handleDelete(): void {
        sendRequest();
        setIsEffect(true);
    }

    return(
        <Box
            width="20rem"
            height="10rem"
            onClick={e => e.stopPropagation()}>
            <Box
                $top="2rem"
                $left="5%"
                $color={props.mode}
                >
                このフォルダを削除しますか?
            </Box>
            <Box
                $top="4rem"
                $left="5%"
                $color={props.mode}
                >
                このフォルダの全てのサブディレクトリ<br/>とissueが削除されます
            </Box>
            <TextButton
                mode={props.mode}
                onClick={handleCancel}
                right="50%"
                bottom="5px"
                width="6rem"
                height="2.3rem">
                Cancel
            </TextButton>
            <FilledButton
                mode={props.mode}
                onClick={handleDelete}
                right="5%"
                bottom="5px"
                width="6rem"
                height="2.3rem">
                Delete
            </FilledButton>
        </Box>
    )
}

export default DeleteFolderContents;