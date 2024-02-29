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
        ${({mode}) => {
            if(mode === "light") {
                return css`
                    background-color: ${themeColor.light.header};
                    &:hover {
                        background-color: ${themeColor.light.surfaceDim};
                    }    
                `
            } else {
                return css`
                    background-color: ${themeColor.dark.header};
                    &:hover {
                        background-color: ${themeColor.dark.onPrimary};
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