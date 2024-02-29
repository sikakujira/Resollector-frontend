import  {styled,  keyframes, css} from 'styled-components';
import themeColor from '../../utils/themeColor';
import { useState } from 'react';

type ButtonProps = {
    width: string,
    height: string,
    $left: string,
    $top: string,
    mode: "light" | "dark",
};

const Button = styled.button<ButtonProps>`
        border-radius: 3rem;
        position: absolute;
        width: ${props => props.width};
        height: ${props => props.height};
        left: ${props => props.$left};
        top: ${props => props.$top};
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
                        background-color: ${themeColor.light.primaryLight};
                        box-shadow: 1px 3px 5px -5px #000000;
                    }
                    &:active {
                        background-color: ${themeColor.light.primaryLighter};
                        box-shadow: none;
                    }
                    `
            } else {
                return css`
                    background-color: ${themeColor.dark.primary};
                    color: ${themeColor.dark.onPrimary};
                    &:hover {
                        background-color: ${themeColor.dark.primaryDark};
                        box-shadow: 1px 3px 5px -5px #ffffff;
                    }
                    &:active {
                        background-color: ${themeColor.dark.primaryDarker};
                        box-shadow: none;
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
        opacity: 0.2;
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
    left: string,
    top: string,
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


    function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
            //半径分引く
            const calculateLocationX = e.nativeEvent.offsetX - 10 ;
            const calculateLocationY = e.nativeEvent.offsetY - 10;  
            setClickedLocation({locationX: calculateLocationX.toString() , locationY: calculateLocationY.toString()});
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
            width={props.width}
            height={props.height}
            $left={props.left}
            $top={props.top}
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