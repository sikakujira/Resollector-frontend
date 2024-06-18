import { styled, css } from 'styled-components';
import themeColor from '../../../utils/themeColor';
import AccountMenuItemButton from '../../button/AccountMenuItemButton';
import { MdOutlineSettings, MdOutlineLogout } from "react-icons/md";
import AccountSettingsDialog from '../AccountSettingsDialog';
import AccountSettings from './AccountSettings';
import { useRef } from 'react';
import { MdWbSunny, MdBedtime } from 'react-icons/md';
import {  useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthDispatchContext } from '../../../context/AuthContext';



type MenuListProps = {
    mode: "light" | "dark"
}

const MenuList = styled.div<MenuListProps>`
        height: auto;
        width: 8rem;
        position: absolute;
        top: 3.5rem;
        right: 3%;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
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

const ItemWrapper = styled.div`
            height: 2.5rem;
            width: 8rem;
`

const ThemeButtonWrapper = styled.div`
            height: 2.5rem;
            width: 8rem;
            @media (min-width: 841px) {
                display: none;
            }
        `

type AccountMenuProps = {
    mode: "light"| "dark",
    $changeTheme?: () => void,
}

function AccountMenu(props: AccountMenuProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const setIsAuthenticated = useContext(AuthDispatchContext);
    const navigate = useNavigate();


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
    
    function logout(): void {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/signin');
    }

    return(
        <MenuList 
            mode={props.mode}
            onClick={e => e.stopPropagation()}
            >
        <ThemeButtonWrapper>
            <AccountMenuItemButton
                mode={props.mode}
                content="Theme"
                onClick={props.$changeTheme}
                >
                {
                props.mode === "light"
                    ? <MdBedtime
                        size={20}/>
                    : <MdWbSunny
                        size={20}/>
                }
            </AccountMenuItemButton>
        </ThemeButtonWrapper>
        <ItemWrapper>
            <AccountMenuItemButton
                mode={props.mode}
                content="Settings"
                onClick={openSettings}
                >
                <MdOutlineSettings
                    size={20}
                    />
            </AccountMenuItemButton>
        </ItemWrapper>
        <ItemWrapper>
            <AccountMenuItemButton
                mode={props.mode}
                content="Log out"
                onClick={logout}
                >
                <MdOutlineLogout
                    size={20}
                    />
            </AccountMenuItemButton>
        </ItemWrapper>
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