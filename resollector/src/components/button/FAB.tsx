import { styled, css, keyframes } from 'styled-components';
import { useState } from 'react';
import themeColor from '../../utils/themeColor';
import { MdAdd } from "react-icons/md";

type ButtonProps = {
    mode: "light"|"dark",
    $bottom: string,
    $right: string,
}

const Button = styled.button<ButtonProps>`
    width: 6rem;
    height: 6rem;
    border-radius: 2rem;
    position: fixed;
    bottom: ${props => props.$bottom};
    right: ${props => props.$right};
    border: none;
    outline: none;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 1px 1px 5px -4px;
    ${({mode}) => {
        if(mode === "light") {
            return css`
                background-color: ${themeColor.light.primaryContainer};
                &:hover {
                    box-shadow: 1px 3px 7px -3px;
                    &::before {
                        content:"";
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: ${themeColor.light.onPrimaryContainer};
                        opacity: 8%;
                }
                &:active {
                    box-shadow: none;
                    &::before {
                        content:"";
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: ${themeColor.light.onPrimaryContainer};
                        opacity: 10%;
                }
                `
        } else {
            return css`
                background-color: ${themeColor.dark.primaryContainer};
                &:hover {
                    &::before {
                        content:"";
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: ${themeColor.dark.onPrimaryContainer};
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
                        background-color: ${themeColor.dark.onPrimaryContainer};
                        opacity: 10%;
                }
                `
        }
    }}`



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
    mode: "light"|"dark",
    $top: string,
    $left: string,
}

const Wave = styled.span<WaveProps>`
    width: 20px;
    height: 20px;
    position: absolute;
    top: ${props => props.$top}px;
    left: ${props => props.$left}px;
    border-radius: 50%;
    transform: scale(0);
    animation: ${props => (props.$isClicked ? animationRule : "none")};
    opacity: 0.1;
    background-color: ${props => (props.mode === "dark" ? "#ffffff" : "#000000")};
    `


type FABProps = {
    bottom: string,
    right: string,
    mode: "light"|"dark",
    onClick?: () => void,
}

function FAB(props: FABProps) {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [location, setLocation] = useState<Location>({locationX: "", locationY: ""});

    type Location = {
        locationX: string,
        locationY: string,
    }

    function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>): void {
            const targetRect = e.currentTarget.getBoundingClientRect();
            const calculationLocationX = e.clientX - targetRect.left - 10;
            const calculationLocationY = e.clientY - targetRect.top - 10;
            setLocation({locationX: calculationLocationX.toString(), locationY: calculationLocationY.toString()});
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
            $bottom={props.bottom}
            $right={props.right}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            >
            {props.mode === "light" 
                ?   <MdAdd
                    size={50}
                    color={themeColor.light.onPrimaryContainer}
                    />
                :   <MdAdd
                    size={50}
                    color={themeColor.dark.onPrimaryContainer}
                    />
            }
            <Wave
                $isClicked={isClicked}
                mode={props.mode}
                $top={location.locationY}
                $left={location.locationX}
                />
        </Button>
    )
}

export default FAB;