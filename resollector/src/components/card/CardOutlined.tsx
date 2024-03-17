import {styled, css} from 'styled-components';
import themeColor from '../../utils/themeColor';

type Props = {
    name: string,
    width?: string,
    height?: string,
    margin?: string,
    $center?: string,
};

const CardOutlined = styled.div.attrs<Props>((props) => ({
        name: props.name,
    }))`
        border: 2px solid ${themeColor.light.primary};
        border-radius: 2rem;
        width: ${props => props.width};
        height: ${props => props.height};
        margin: ${props => props.margin};
        ${({$center}) => {
            if($center === "true") {
                return css`
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    margin: auto;
                `
            }
        }}
    `

export default CardOutlined;
