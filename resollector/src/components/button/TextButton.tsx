import { styled, css, keyframes } from 'styled-components';
import themeColor from '../../utils/themeColor';
import React, { useState } from 'react';

type ButtonProps = {
    height: string,
    width: string,
    $top: string,
    $left: string,
    mode: "light" | "dark",
}

const Button = styled.button<ButtonProps>`
    position: absolute;
    height: ${props => props.height};
    width: ${props => props.width};
    left: ${props => props.$left};
    top: ${props => props.$top};
    border: none;
    outline: none;
    overflow: hidden;
    border-radius: 3rem;
    font-size: 15px;
    background-color: rgba(0,0,0,0);
    cursor: pointer;
    ${({mode}) => {
        if(mode === "light") {
            return css`
                color: ${themeColor.light.primary};
                &:hover {
                    background-color: ${themeColor.light.surfaceContainer};
                }
                &:active {
                    background-color: ${themeColor.light.surfaceContainerHigh};
                }
            `
        } else {
            return css`
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
    background-color: ${themeColor.light.primary};
    animation: ${props => (props.$isClicked ? animationRule : "none")};
`


type TextButtonProps = {
    height: string,
    width: string,
    top: string,
    left: string,
    content: string,
    mode: "light" | "dark",
    onClick?: () => void, 
}

function TextButton(props: TextButtonProps) {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [clickedLocation, setClickedLocation] = useState<Location>({locationX: "", locationY: ""})

    type Location = {
        locationX: string,
        locationY: string,
    }
    
    function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
            //半径分引く
            const calculateLocationX = e.nativeEvent.offsetX - 10;
            const calculateLocationY = e.nativeEvent.offsetY - 10;
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
            height={props.height} 
            width={props.width} 
            $top={props.top} 
            $left={props.left}
            mode={props.mode}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            >
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

export default TextButton;