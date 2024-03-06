import { styled, css } from 'styled-components';
import themeColor from '../../utils/themeColor';

const AccountDeleteConfirmDialog = styled.dialog<{mode: "light"|"dark"}>`
width: 25rem;
height: 15rem;
border: none;
border-radius: 0.5rem;
${({mode}) => {
    if(mode === "light") {
        return css`
            background-color: ${themeColor.light.surfaceContainerHigh};
        `
    } else {
        return css`
            background-color: ${themeColor.dark.surfaceContainerHigh};
        `
    }
}}`


export default AccountDeleteConfirmDialog;