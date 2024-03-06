import { styled, css } from 'styled-components';
import { MdWbSunny, MdBedtime } from 'react-icons/md';
import themeColor  from '../../utils/themeColor';

const Button = styled.button<{mode: "light"|"dark"}>`
        position: absolute;
        left: 0;
        height: 3rem;
        width: 3rem;
        border: none;
        outline: none;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        ${({mode}) => {
            if(mode === "light") {
                return css`
                    background-color: ${themeColor.light.surfaceContainer};
                    &:hover {
                        &::before {
                            content: "";
                            background-color: ${themeColor.light.primary};
                            height: 100%;
                            width: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            opacity: 8%;
                        }
                   
                    }    
                `
            } else {
                return css`
                    background-color: ${themeColor.dark.surfaceContainerHigh};
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
                `
            }
        }}
    `

type ThemeButtonProps = {
        mode: "light" | "dark",
        onClick?: () => void,
}

function ThemeButton(props: ThemeButtonProps) {
    return(
        <Button 
            mode={props.mode} 
            onClick={props.onClick}
            >
            {props.mode === "dark" ? 
                <MdWbSunny  
                    size={20} 
                    color={themeColor.dark.primary}
                    /> 
            :   <MdBedtime 
                    size={20} 
                    color={themeColor.light.primary}
                    />
            }
        </Button>
    )
}

export default ThemeButton;