import { styled } from 'styled-components';

type Props = {
    $top?: string,
    $left?: string,
    $right?: string,
    height?: string,
    width?: string,
    color?: string,
    fontSize?: string,
};

const Box = styled.div<Props>`
        position: absolute;
        top: ${props => props.$top};
        left: ${props => props.$left};
        right: ${props => props.$right};
        height: ${props => props.height};
        width: ${props => props.width};
        color: ${props => props.color};
        font-size: ${props => props.fontSize};
    `

export default Box;