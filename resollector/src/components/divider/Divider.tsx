import { styled } from 'styled-components';
import themeColor from '../../utils/themeColor';

type Props = {
    $top: string,
    $left: string,
    $width: string,
    mode?: "light"|"dark",
}

const Divider = styled.div<Props>`
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};
    height: 1px;
    width: ${props => props.$width};
    background-color: 
        ${props => {
           if(!props.mode || props.mode === "light") {
                return `${themeColor.light.outlineVariant}`;
           } else {
                return `${themeColor.dark.outlineVariant}`;
           }
        }};
`

export default Divider;