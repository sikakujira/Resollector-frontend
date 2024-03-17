import { styled, css, keyframes } from 'styled-components';
import React, { useState } from 'react';
import themeColor from '../../utils/themeColor';
import Box from '../box/Box';

type ButtonProps = {
    mode: "light"|"dark",
    $displayNone?: boolean,
}

const Button = styled.button<ButtonProps>`
        position: absolute;
        border: none;
        outline: none;
        overflow: hidden;
        cursor: pointer;
        width: 100%;
        height: 2.5rem;
        border-radius: 0.5rem;
        ${({mode}) => {
            if(mode === "light") {
                return css`
                    background-color: ${themeColor.light.surfaceContainer};
                    color: ${themeColor.light.onSurfaceVariant};
                    &:hover {
                        &::before {
                            content: "";
                            height: 100%;
                            width: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            background-color: ${themeColor.light.primary};
                            opacity: 8%;
                        }
                    }
                    &:active {
                        &::before {
                            content: "";
                            background-color: ${themeColor.light.primary};
                            height: 100%;
                            width: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: 10%;
                        }
                    }
                    `
            } else {
                return css`
                    background-color: ${themeColor.dark.surfaceContainerHigh};
                    color: ${themeColor.dark.onSurfaceVariant};
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
                    &:active {
                        &::before {
                            content: "";
                            background-color: ${themeColor.dark.primary};
                            height: 100%;
                            width: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: 10%;
                        }
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
    className?: string,
}

function AccountMenuItemButton(props: AccountMenuItemButtonProps) {
        const [isClicked, setIsClicked] = useState<boolean>(false);
        const [clickedLocation, setClickedLocation] = useState<Location>({locationX: "", locationY: "" });

        type Location = {
            locationX: string,
            locationY: string,
        }

        function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>): void {
                const targetRect = e.currentTarget.getBoundingClientRect();
                const calculationLocationX = e.clientX - targetRect.left - 10;
                const calculationLocationY = e.clientY - targetRect.top - 10;
                setClickedLocation({locationX: calculationLocationX.toString(), locationY: calculationLocationY.toString()});
                setIsClicked(true);
        }

        function handleMouseUp(): void {
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
            className={props.className}
            >
            <Box
                $left="0.7rem"
                $top="0.6rem"
                >
                {props.children}
            </Box>
            <Box
                $left="2.7rem"
                $top="0.8rem">
                {props.content}
            </Box>
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