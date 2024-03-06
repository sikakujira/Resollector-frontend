import styled from 'styled-components';

//位置調節用

type Props = {
    $top?: string,
    $right?: string,
    $bottom?: string,
    $left?: string,
    $width?: string,
    $height?: string,
    $margin?: string,
};

const Wrapper = styled.div<Props>`
        position: absolute;
        top: ${({$top}) => $top};
        right: ${({$right}) => $right};
        bottom: ${({$bottom}) => $bottom};
        left: ${({$left}) => $left};
        width: ${props => props.$width};
        height: ${props => props.$height};
        margin: ${props => props.$margin};
    `

export default Wrapper;