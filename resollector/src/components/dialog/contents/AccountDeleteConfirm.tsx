import { styled } from 'styled-components';
import Box from '../../box/Box';
import FilledButton from '../../button/FilledButton';
import TextButton from '../../button/TextButton';
import AccountDeleteConfirmDialog from '../AccountDeleteConfirmDialog';
import AccountDeleteConfirmPassword from './AccountDeleteConfirmPassword';
import { useRef } from 'react';

const DialogCard = styled.div`
        width: 100%;
        height: 100%;
`

type Props = {
    mode: "light"| "dark",
    closeDialog: () => void,
}

function AccountDeleteConfirm(props: Props) {
    const accountDeleteDialogRef = useRef<HTMLDialogElement>(null);

    function closeAccountDeleteDialog(): void {
        if(accountDeleteDialogRef.current) {
            accountDeleteDialogRef.current.close();
        }
    }

    function openAccountDeleteDialog(): void {
        if(accountDeleteDialogRef.current) {
            accountDeleteDialogRef.current.showModal();
        }
    }

    return(
        <DialogCard
            onClick={e => e.stopPropagation()}
            >
        <Box
            $color={props.mode}
            $top="5rem"
            $left="2rem"
            >
            アカウントに関連する全てのデータが失われ、<br/>元に戻すことはできません<br/>
            本当に削除しますか？ 
        </Box>
        <TextButton
            top="13rem"
            left="40%"
            width="6rem"
            height="2.5rem"
            mode={props.mode}
            content="Cancel"
            onClick={props.closeDialog}
            />
        <FilledButton
            top="13rem"
            left="70%"
            width="6rem"
            height="2.5rem"
            mode={props.mode}
            content="Delete"
            onClick={openAccountDeleteDialog}
            />
        <AccountDeleteConfirmDialog
                  mode={props.mode}
                  ref={accountDeleteDialogRef}
                  onClick={closeAccountDeleteDialog}
                  >
            <AccountDeleteConfirmPassword
                    mode={props.mode}
                    closeDialog={closeAccountDeleteDialog}/>
        </AccountDeleteConfirmDialog>

        </DialogCard>
    )
}

export default AccountDeleteConfirm;