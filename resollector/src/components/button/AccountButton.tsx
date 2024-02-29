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
        ${props => {
            switch(true) {
                case (props.mode === "light") && (props.$isClicked === false):
                    return css`
                        background-color: ${themeColor.light.header};
                        &:hover {
                            background-color: ${themeColor.light.surfaceDim};
                        }
                    `
                case (props.mode === "light") && (props.$isClicked === true):
                    return css`
                        background-color: ${themeColor.light.surfaceDim};
                    `
                case (props.mode === "dark") && (props.$isClicked === false):
                    return css`
                        background-color: ${themeColor.dark.header};
                        &:hover {
                        background-color: ${themeColor.dark.onPrimary};
                        }
                    `
                case (props.mode === "dark") && (props.$isClicked === true):
                    return css`
                        background-color: ${themeColor.dark.onPrimary};
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

        function openDialog() {
            if(dialogRef.current) {
                dialogRef.current.showModal();
                setIsClicked(true);
            }
        }

        function closeDialog() {
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
