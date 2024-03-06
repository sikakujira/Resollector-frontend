import { styled, css } from 'styled-components';
import themeColor from '../../../utils/themeColor';
import AccountMenuItemButton from '../../button/AccountMenuItemButton';
import { MdOutlineSettings, MdOutlineLogout } from "react-icons/md";
import AccountSettingsDialog from '../AccountSettingsDialog';
import AccountSettings from './AccountSettings';
import { useRef } from 'react';



type MenuListProps = {
    mode: "light" | "dark"
}

const MenuList = styled.div<MenuListProps>`
        height: 5rem;
        width: 8rem;
        position: absolute;
        top: 3.5rem;
        right: 3%;
        border-radius: 0.5rem;
        ${({mode}) => {
            if(mode === "light") {
                return css`
                    background-color: ${themeColor.light.surfaceContainer};
                    box-shadow: 2px 3px 6px -5px;
                    `
            } else {
                return css`
                    background-color: ${themeColor.dark.surfaceContainerHigh};
                    `
            }
        }}
    `

type AccountMenuProps = {
    mode: "light"| "dark",
}

function AccountMenu(props: AccountMenuProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    function openSettings(): void {
        if(dialogRef.current) {
            dialogRef.current.showModal();
        }
    }

    function closeSettings(): void {
        if(dialogRef.current) {
            dialogRef.current.close();
        }
    }
    
    function logout(): void {}

    return(
        <MenuList 
            mode={props.mode}
            onClick={e => e.stopPropagation()}
            >
        <AccountMenuItemButton
            mode={props.mode}
            content="Settings"
            $top="0"
            onClick={openSettings}
            >
            <MdOutlineSettings
                size={20}
                />
        </AccountMenuItemButton>
        <AccountMenuItemButton
            mode={props.mode}
            content="Log out"
            $top="50%"
            onClick={logout}
            >
            <MdOutlineLogout
                size={20}
                />
        </AccountMenuItemButton>
        <AccountSettingsDialog
            onClick={closeSettings}
            ref={dialogRef}
            mode={props.mode}
            >
            <AccountSettings
                mode={props.mode}
                onClick={closeSettings}
                />
        </AccountSettingsDialog>
        </MenuList>
    )
}

export default AccountMenu;