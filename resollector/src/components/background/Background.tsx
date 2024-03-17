import {styled, css} from 'styled-components';
import themeColor from '../../utils/themeColor';

type Props = {
    mode: "light"| "dark"
};

const Background = styled.div<Props>`
    width: 100%;
    height: 100vh;
    position: fixed;
    ${({mode}) => {
        if(mode === "light"){
            return css`
            background-color: ${themeColor.light.surface};
            `
        } else if(mode === "dark") {
            return css`
            background-color: ${themeColor.dark.surface};
            `
        }
    }}
    `

export default Background;