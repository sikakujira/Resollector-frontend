import { styled } from 'styled-components';
import Box from '../../box/Box';
import FilledButton from '../../button/FilledButton';
import TextButton from '../../button/TextButton';
import TextFieldOutline from '../../textField/TextFieldOutline';
import themeColor from '../../../utils/themeColor';
import { useState } from 'react';

const DialogCard = styled.div`
        width: 100%;
        height: 100%;
`

type Props = {
    mode: "light"| "dark",
    closeDialog: () => void,
}

function AccountDeleteConfirmPassword(props: Props) {
    const [value, setValue] = useState<string>("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value);
    }

    function cancel(): void {
        setValue("");
        props.closeDialog();
    }

    function handleAccountDeleteButton(): void {
        //アカウント処理
    }

    return(
        <DialogCard
            onClick={e => e.stopPropagation()}
            >
        <Box
            $color={props.mode}
            $top="3rem"
            $left="2rem"
            >
            パスワードを入力してください
        </Box>
        <TextFieldOutline
            mode={props.mode}
            width="20rem"
            height="2.5rem"
            top="7rem"
            left="10%"
            name="accountdeletepassword"
            value={value}
            placeholder="Password"
            onChange={handleChange}
            type="password"
            labelColorLight={themeColor.light.surfaceContainerHigh}
            labelColorDark={themeColor.dark.surfaceContainerHigh}
            labelTop="0.7rem"
            />
        <TextButton
            top="13rem"
            left="40%"
            width="6rem"
            height="2.5rem"
            mode={props.mode}
            content="Cancel"
            onClick={cancel}
            />
        <FilledButton
            top="13rem"
            left="70%"
            width="6rem"
            height="2.5rem"
            mode={props.mode}
            content="Delete"
            onClick={handleAccountDeleteButton}
            />

        </DialogCard>
    )
}

export default AccountDeleteConfirmPassword;