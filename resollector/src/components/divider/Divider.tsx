import { styled } from 'styled-components';
import themeColor from '../../utils/themeColor';

type Props = {
    $top: string,
    $left: string,
    $width: string,
}

const Divider = styled.div<Props>`
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};
    height: 1px;
    width: ${props => props.$width};
    background-color: ${themeColor.light.outlineVariant};
`

export default Divider;