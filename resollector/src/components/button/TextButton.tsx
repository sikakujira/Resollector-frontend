import { styled, css, keyframes } from 'styled-components';
import themeColor from '../../utils/themeColor';
import React, { useState } from 'react';

type ButtonProps = {
    height?: string,
    width?: string,
    $top?: string,
    $left?: string,
    $bottom?: string,
    $right?: string,
    $zIndex?: string,
    mode: "light" | "dark",
}

const Button = styled.button<ButtonProps>`
    position: absolute;
    height: ${props => props.height};
    width: ${props => props.width};
    left: ${props => props.$left};
    top: ${props => props.$top};
    bottom: ${props => props.$bottom};
    right: ${props => props.$right};
    border: none;
    outline: none;
    overflow: hidden;
    border-radius: 3rem;
    font-size: 15px;
    background-color: rgba(0,0,0,0);
    cursor: pointer;
    z-index: ${props => props.$zIndex};
    ${({mode}) => {
        if(mode === "light") {
            return css`
                color: ${themeColor.light.primary};
                &:hover {
                    &::before {
                        content:"";
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: ${themeColor.light.primary};
                        opacity: 8%;
                }
                &:active {
                    &::before {
                        content:"";
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: ${themeColor.light.primary};
                        opacity: 10%;
                }
            `
        } else {
            return css`
                color: ${themeColor.dark.primary};
                &:hover {
                    &::before {
                        content:"";
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: ${themeColor.dark.primary};
                        opacity: 8%;
                }
                &:active {
                    &::before {
                        content:"";
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: ${themeColor.dark.primary};
                        opacity: 10%;
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
    background-color: ${props => (props.mode === "light" ? themeColor.light.primary : "#ffffff")};
    animation: ${props => (props.$isClicked ? animationRule : "none")};
`


type TextButtonProps = {
    height?: string,
    width?: string,
    top?: string,
    left?: string,
    right?: string,
    bottom?: string,
    content?: string,
    mode: "light" | "dark",
    onClick?: () => void, 
    zIndex?: string,
    className?: string,
    children?: React.ReactNode,
}

function TextButton(props: TextButtonProps) {
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
            height={props.height} 
            width={props.width} 
            $top={props.top} 
            $left={props.left}
            $bottom={props.bottom}
            $right={props.right}
            $zIndex={props.zIndex}
            mode={props.mode}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className={props.className}
            >
            {props.content}
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

export default TextButton;