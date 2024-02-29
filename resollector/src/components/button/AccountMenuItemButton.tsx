import { styled, css, keyframes } from 'styled-components';
import React, { useState } from 'react';
import themeColor from '../../utils/themeColor';
import Box from '../box/Box';

type ButtonProps = {
    mode: "light"|"dark",
    $top: string,
}

const Button = styled.button<ButtonProps>`
        border: none;
        outline: none;
        overflow: hidden;
        cursor: pointer;
        position: absolute;
        top: ${props => props.$top};
        width: 100%;
        height: 50%;
        border-radius: 0.5rem;
        ${({mode}) => {
            if(mode === "light") {
                return css`
                    background-color: ${themeColor.light.header};
                    &:hover {
                        background-color: ${themeColor.light.surfaceDim};
                    }
                    &:active {
                        background-color: ${themeColor.light.surfaceDimDark};
                    }
                    `
            } else {
                return css`
                    background-color: ${themeColor.dark.header};
                    color: ${themeColor.light.surface};
                    &:hover {
                        background-color: ${themeColor.dark.onPrimary};
                    }
                    &:active {
                        background-color: ${themeColor.dark.onPrimaryLight};
                    }
                    `
            }
        }}
`
const waveAnimation = keyframes`
        to {
            transform: scale(20);
        }
`

const animationRule = css`
        ${waveAnimation} 2s ease-out;
`
    
type WaveProps = {
    $isClicked: boolean,
    $top: string,
    $left: string,
    mode: "light"|"dark",
}

const Wave = styled.span<WaveProps>`
        position: absolute;
        top: ${props => props.$top}px;
        left: ${props => props.$left}px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        transform: scale(0);
        animation: ${props => (props.$isClicked ? animationRule : "none")};
        opacity: 0.1;
        ${({mode}) => {
            if(mode === "light") {
                return css`
                    background-color: ${themeColor.light.primary};
                    `
            } else {
                return css`
                    background-color: ${themeColor.dark.primary};
                    `
            }
        }}
        `

type AccountMenuItemButtonProps = {
    mode: "light"|"dark",
    children?: React.ReactNode,
    content: string,
    onClick?: () => void,
    $top: string,
}

function AccountMenuItemButton(props: AccountMenuItemButtonProps) {
        const [isClicked, setIsClicked] = useState<boolean>(false);
        const [clickedLocation, setClickedLocation] = useState<Location>({locationX: "", locationY: "" });

        type Location = {
            locationX: string,
            locationY: string,
        }

        function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
                const targetRect = e.currentTarget.getBoundingClientRect();
                const calculateLocationX = e.clientX - targetRect.left - 10;
                const calculateLocationY = e.clientY - targetRect.top - 10;
                setClickedLocation({locationX: calculateLocationX.toString(), locationY: calculateLocationY.toString()});
                setIsClicked(true);
        }

        function handleMouseUp() {
                setIsClicked(false);
                if(props.onClick !== undefined) {
                    props.onClick();
                }
        }

    return(
        <Button
            mode={props.mode}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            $top={props.$top}
            >
            <Box
                $left="0.7rem"
                $top="0.6rem"
                >
                {props.children}
            </Box>
                {props.content}
            <Wave
                $isClicked={isClicked}
                $top={clickedLocation.locationY}
                $left={clickedLocation.locationX}
                mode={props.mode}
                >
            </Wave>
        </Button>
    )
}

export default AccountMenuItemButton;