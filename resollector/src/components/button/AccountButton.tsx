import { MdOutlinePersonOutline } from "react-icons/md";
import { styled, css } from 'styled-components';
import themeColor from '../../utils/themeColor';
import { useState, useRef } from 'react';
import AccountMenuDialog from '../dialog/AccountMenuDialog';
import AccountMenu from '../dialog/contents/AccountMenu';
import { MdMoreHoriz } from 'react-icons/md';

type ButtonProps = {
        mode: "light"|"dark", 
        $isClicked: boolean,
}

const Button = styled.button<ButtonProps>`
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        position: absolute;
        right: 1rem;
        border: none;
        outline: none;
        cursor: pointer;
        overflow: hidden;
        background-color: transparent;
        ${props => {
            switch(true) {
                case (props.mode === "light") && (props.$isClicked === false):
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
                case (props.mode === "light") && (props.$isClicked === true):
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
                case (props.mode === "dark") && (props.$isClicked === false):
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
                case (props.mode === "dark") && (props.$isClicked === true):
                    return css`
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

const PersonIcon = styled(MdOutlinePersonOutline)`
            @media (max-width: 840px) {
                display: none;
            }
        `
const MenuIcon = styled(MdMoreHoriz)`
            @media (min-width: 841px) {
                display: none;
            }
        `

type AccountButtonProps = {
    mode: "light"|"dark",
    $changeTheme?: () => void,
}

function AccountButton(props: AccountButtonProps) {
        const [isClicked, setIsClicked] = useState<boolean>(false);
        const dialogRef = useRef<HTMLDialogElement>(null);

        function openDialog(): void {
            if(dialogRef.current) {
                dialogRef.current.showModal();
                setIsClicked(true);
            }
        }

        function closeDialog(): void {
            if(dialogRef.current) {
                dialogRef.current.close();
                setIsClicked(false);
            }
        }
    return(
        <>
        <Button 
            mode={props.mode}
            $isClicked={isClicked}
            onClick={openDialog}
        >
            <PersonIcon
                size={25}
                />
            <MenuIcon
                size={30}
                />
        </Button>
        <AccountMenuDialog
            ref={dialogRef}
            onClick={closeDialog}
            >
            <AccountMenu
                mode={props.mode}
                $changeTheme={props.$changeTheme}
                />
        </AccountMenuDialog>
        </>
    )
}

export default AccountButton;
