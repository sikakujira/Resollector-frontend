import { styled } from 'styled-components';
import themeColor from '../../utils/themeColor';

type Props = {
    $top?: string,
    $left?: string,
    $right?: string,
    height?: string,
    width?: string,
    $color?: string|"light"|"dark",
    fontSize?: string,
    $zIndex?: string,
};

const Box = styled.div<Props>`
        position: absolute;
        top: ${props => props.$top};
        left: ${props => props.$left};
        right: ${props => props.$right};
        height: ${props => props.height};
        width: ${props => props.width};
        color: 
            ${props => {
                switch(props.$color) {
                    case "light":
                        return themeColor.light.onSurfaceVariant;
                    case "dark":
                        return themeColor.dark.onSurfaceVariant;
                    default:
                        return props.$color;
                }
            }};
        font-size: ${props => props.fontSize};
        z-index: ${props => props.$zIndex};
    `

export default Box;