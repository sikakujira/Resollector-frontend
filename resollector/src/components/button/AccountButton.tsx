import { MdOutlinePersonOutline } from "react-icons/md";
import { styled, css } from 'styled-components';
import themeColor from '../../utils/themeColor';
import { useState, useRef } from 'react';
import AccountMenuDialog from '../dialog/AccountMenuDialog';
import AccountMenu from '../dialog/contents/AccountMenu';

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
        ${props => {
            switch(true) {
                case (props.mode === "light") && (props.$isClicked === false):
                    return css`
                        background-color: ${themeColor.light.surfaceContainer};
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
                    `
                case (props.mode === "light") && (props.$isClicked === true):
                    return css`
                        background-color: ${themeColor.light.surfaceContainer};
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
                    `
                case (props.mode === "dark") && (props.$isClicked === false):
                    return css`
                        background-color: ${themeColor.dark.surfaceContainerHigh};
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
                    `
                case (props.mode === "dark") && (props.$isClicked === true):
                    return css`
                        background-color: ${themeColor.dark.surfaceContainerHigh};
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
                        `
            }    
        }}
        `


type AccountButtonProps = {
    mode: "light"|"dark",
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
            {props.mode === "light" ?  
                <MdOutlinePersonOutline
                    size={25}
                    color={themeColor.light.primary}
                    />
            :   <MdOutlinePersonOutline
                    size={25}
                    color={themeColor.dark.primary}
                    />
            }
            </Button>
        <AccountMenuDialog
            ref={dialogRef}
            onClick={closeDialog}
            >
            <AccountMenu
                mode={props.mode}
                />
        </AccountMenuDialog>
        </>
    )
}

export default AccountButton;
