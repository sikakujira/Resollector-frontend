import { styled, css, keyframes } from 'styled-components';
import React, { useState } from 'react';
import themeColor from '../../utils/themeColor';

type ButtonProps = {
    mode: "light" | "dark",
}

const Button = styled.button<ButtonProps>`
    border: none;
    outline: none;
    overflow: hidden;
    cursor: pointer;
    ${props => {
        if(props.mode === "light") {
            return css`
                color: ${themeColor.light.onSecondaryContainer};
                background-color: ${themeColor.light.secondaryContainer};
                &:hover {
                    &::before {
                        content:"";
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        opacity: 8%;
                        background-color: ${themeColor.light.onSecondaryContainer};
                }
                &:active {
                    &::before {
                        content:"";
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        opacity: 10%;
                        background-color: ${themeColor.light.onSecondaryContainer};
                }
            `
        } else {
            return css`
                color: ${themeColor.dark.onSecondaryContainer};
                background-color: ${themeColor.dark.secondaryContainer};
                &:hover {
                    &::before {
                        content:"";
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        opacity: 8%;
                        background-color: ${themeColor.dark.onSecondaryContainer};
                }
                &:active {
                    &::before {
                        content:"";
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        opacity: 10%;
                        background-color: ${themeColor.dark.onSecondaryContainer};
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
        ${waveAnimation} 2.5s ease-out;
    `
type WaveProps = {
    $isClicked: boolean,
    $top: string,
    $left: string,
    mode: "light" | "dark",
}

const Wave = styled.span<WaveProps>`
    position: absolute;
    top: ${props => props.$top}px;
    left: ${props => props.$left}px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    transform: scale(0);
    opacity: 0.1;
    background-color: 
        ${props => (
            props.mode === "light" 
                ? `${themeColor.light.onSecondaryContainer}` 
                : `${themeColor.dark.onSecondaryContainer}`
            )};
    animation: ${props => (props.$isClicked ? animationRule : "none")};
`


type TextButtonProps = {
    mode: "light" | "dark",
    onClick?: () => void, 
    className?: string,
    children?: React.ReactNode,
}

function SecondaryContainerButton(props: TextButtonProps) {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [clickedLocation, setClickedLocation] = useState<Location>({locationX: "", locationY: ""})

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
            {props.children}
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

export default SecondaryContainerButton;