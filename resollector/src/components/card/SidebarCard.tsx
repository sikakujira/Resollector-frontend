import { styled, css } from 'styled-components';
import themeColor from '../../utils/themeColor';


type Props = {
    mode: "light"|"dark",
    $sidebarWidth: string,
}

const SidebarCard = styled.div.attrs<Props>(props => ({
        style: {
            width: `${props.$sidebarWidth}px`,
        }
    }))`
    max-width: 90%;
    min-width: 10%;
    height: auto;
    position: fixed;
    top:5.2rem;
    left 0;
    bottom: 4px;
    border-radius: 0 4rem 4rem 0;
    z-index: 3;
    ${props => {
        if(props.mode === "light") {
            return css`
                background-color: ${themeColor.light.surfaceContainer};
                box-shadow: 1px 1px 4px -2px;
            `
        } else {
            return css`
                background-color: ${themeColor.dark.surfaceContainer};
            `
        }
    }}
`

export default SidebarCard;