import  {styled,  keyframes, css} from 'styled-components';
import themeColor from '../../utils/themeColor';
import { useState } from 'react';

type ButtonProps = {
    width: string,
    height: string,
    $left?: string,
    $top?: string,
    $right?: string,
    $bottom?: string,
    mode: "light" | "dark",
};

const Button = styled.button<ButtonProps>`
        border-radius: 3rem;
        position: absolute;
        width: ${props => props.width};
        height: ${props => props.height};
        left: ${props => props.$left};
        top: ${props => props.$top};
        bottom: ${props => props.$bottom};
        right: ${props => props.$right};
        border: none;
        outline: none;
        font-size: 15px;
        cursor: pointer;
        overflow: hidden;
        ${({mode}) => {
            if(mode === "light") {
                return css`
                    background-color: ${themeColor.light.primary};
                    color: ${themeColor.light.onPrimary};
                    &:hover {
                        box-shadow: 1px 3px 5px -5px #000000;
                        &::before {
                            content:"";
                            height: 100%;
                            width: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            background-color: ${themeColor.light.onPrimary};
                            opacity: 8%;
                        }
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
                            background-color: ${themeColor.light.onPrimary};
                            opacity: 10%;
                    }
                    `
            } else {
                return css`
                    background-color: ${themeColor.dark.primary};
                    color: ${themeColor.dark.onPrimary};
                    &:hover {
                        box-shadow: 1px 3px 5px -5px #ffffff;
                        &::before {
                            content:"";
                            height: 100%;
                            width: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            background-color: ${themeColor.dark.onPrimary};
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
                            background-color: ${themeColor.dark.onPrimary};
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
//クリック時の波紋アクション
const Wave = styled.span<{$isClicked: boolean, mode: "light" | "dark", $top: string, $left: string}>`
        width: 20px;
        height: 20px;
        position: absolute;
        top: ${props => props.$top}px;
        left: ${props => props.$left}px;
        border-radius: 50%;
        transform: scale(0);
        opacity: 0.1;
        ${({mode}) => {
            if(mode === "light") {
                return css`
                background-color: #ffffff;
                `
            } else {
                return css`
                background-color: #000000;
                `
            }
        }}
        animation: ${props => (props.$isClicked ? animationRule : "none")};
       
    `


type FilledButtonProps = {
    width: string,
    height: string,
    left?: string,
    top?: string,
    right?: string,
    bottom?: string,
    mode: "light" | "dark",
    content: string,
    onClick?: () => void,
};

function FilledButton(props: FilledButtonProps) {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [clickedLocation, setClickedLocation] = useState<Location>({locationX: "", locationY: ""});

    type Location =  {
        locationX: string,
        locationY: string,
    };


    function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>): void {
            //半径分引く
            const calculationLocationX = e.nativeEvent.offsetX - 10 ;
            const calculationLocationY = e.nativeEvent.offsetY - 10;  
            setClickedLocation({locationX: calculationLocationX.toString() , locationY: calculationLocationY.toString()});
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
            width={props.width}
            height={props.height}
            $left={props.left}
            $top={props.top}
            $bottom={props.bottom}
            $right={props.right}
            mode={props.mode}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            >
            {props.content}
            <Wave 
                $isClicked={isClicked} 
                mode={props.mode} 
                $top={clickedLocation.locationY}
                $left={clickedLocation.locationX}
                >
            </Wave>
        </Button>
    )
}

export default FilledButton;