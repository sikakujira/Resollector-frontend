import { styled, css, keyframes } from 'styled-components';
import themeColor from '../../utils/themeColor';
import React, { useState } from 'react';


const Card = styled.div<{mode: "light"|"dark"}>`
        position: absolute;
        height: 5rem;
        width: 100%;
        box-shadow: 4px 4px 6px -8px;
        border-radius: 0.7rem;
        overflow: hidden;
        cursor: pointer;
        ${props => {
            if(props.mode === "light") {
                return css`
                    background-color: ${themeColor.light.surfaceContainerLow};
                    &:hover {
                        &::before {
                            content: "";
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: 8%;
                            background-color: ${themeColor.light.primary};
                        }
                    }
                    &:active {
                        &::before {
                            content: "";
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: 10%;
                            background-color: ${themeColor.light.primary};
                        }
                    }
                `
            } else {
                return css`
                    background-color: ${themeColor.dark.surfaceContainerLow};
                    &:hover {
                        &::before {
                            content: "";
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: 8%;
                            background-color: ${themeColor.dark.primary};
                        }
                    }
                    &:active {
                        &::before {
                            content: "";
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: 10%;
                            background-color: ${themeColor.dark.primary};
                        }
                    }
                `
            }
        }}
`

const waveAnimation = keyframes`
        to {
            transform: scale(60);
        }
`

const animationRule = css`
        ${waveAnimation} 1.8s  ease-out;

`

type WaveProps = {
    mode: "light"|"dark",
    $top: string,
    $left: string,
    $isClicked: boolean,
}

const Wave = styled.span<WaveProps>`
        position: absolute;
        top: ${props => props.$top}px;
        left: ${props => props.$left}px;
        border-radius: 50%;
        width: 20px;
        height:20px;
        transform: scale(0);
        opacity: 0.1;
        background-color: 
        ${props => props.mode === "light"
            ? `${themeColor.light.primary}`
            : `${themeColor.dark.primary}`
        };
        animation: ${props => props.$isClicked ? animationRule : "none"};
    `
type IssueElevatedCardProps = {
    mode: "light"|"dark",
    children?: React.ReactNode,
    issueURL?: string,
}

function IssueElevatedCard(props: IssueElevatedCardProps) {
    const [location, setLocation] = useState<Location>({locationX: "", locationY: ""});
    const [isClicked, setIsClicked] = useState<boolean>(false);

    type Location = {
        locationX: string,
        locationY: string,
    }
    
    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>): void {
        const targetReact = e.currentTarget.getBoundingClientRect();
        const calculateLocationX = e.clientX - targetReact.left - 10;
        const calculateLocationY = e.clientY - targetReact.top - 10;
        setLocation({locationX: calculateLocationX.toString(), locationY: calculateLocationY.toString()});
        setIsClicked(true);
    }

    function handleMouseUp(): void {
        setIsClicked(false);
        redirectToURL();
    }

    function redirectToURL(): void {
        if(props.issueURL) {
        window.open(props.issueURL);
        }
    }


    return(
        <Card
            mode={props.mode}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            >
            <Wave 
                mode={props.mode}
                $top={location.locationY}
                $left={location.locationX}
                $isClicked={isClicked}
                />
                {props.children}
        </Card>
    )
}


export default IssueElevatedCard;