import Box from '../../box/Box';
import { styled } from 'styled-components';
import Divider from '../../divider/Divider';
import TextButton from '../../button/TextButton';
import FilledButton from '../../button/FilledButton';
import AccountDeleteConfirmDialog from '../AccountDeleteConfirmDialog';
import AccountDeleteConfirm from './AccountDeleteConfirm';
import { useRef } from 'react'; 

const DialogCard = styled.div`
    width: 100%;
    height: 100%
    `

type Props = {
    mode: "light"|"dark"
    onClick: () => void,
}

function AccountSettings(props: Props) {
    const accountDeleteDialogRef = useRef<HTMLDialogElement>(null);


    function showAccountDeleteDialog(): void {
        if(accountDeleteDialogRef.current) {
            accountDeleteDialogRef.current.showModal();
        }
    }

    function closeAccountDeleteDialog(): void {
        if(accountDeleteDialogRef.current) {
            accountDeleteDialogRef.current.close();
        }
    }

    return(
        <DialogCard
            onClick={e => e.stopPropagation()}
            >
            <Box
                fontSize="1.5rem"
                $left="5%"
                $color={props.mode}
                >
                Settings
            </Box>
            <Divider
                $top="3rem"
                $width="90%"
                $left="5%"
                />
            <Box
                $top="5rem"
                $left="10%"
                $color={props.mode}
                >
                アカウントの削除
            </Box>
            <FilledButton
                width="5rem"
                height="2rem"
                top="4.5rem"
                left="70%"
                mode={props.mode}
                content="Delete"
                onClick={showAccountDeleteDialog}
                />
            <TextButton
                width="2rem"
                height="2rem"
                top="0.8rem"
                left="90%"
                mode={props.mode}
                content="X"
                onClick={props.onClick}/>
            <AccountDeleteConfirmDialog
                mode={props.mode}
                ref={accountDeleteDialogRef}
                onClick={closeAccountDeleteDialog}
                >
                <AccountDeleteConfirm
                    mode={props.mode}
                    closeDialog={closeAccountDeleteDialog}
                    />
            </AccountDeleteConfirmDialog>
        </DialogCard>
    )
}

export default AccountSettings;