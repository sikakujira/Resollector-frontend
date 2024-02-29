import { styled, css } from 'styled-components';
import themeColor from '../../utils/themeColor';

const AccountSettingsDialog = styled.dialog<{mode: "light"|"dark"}>`
    width: 30rem;
    height: 15rem;
    border: none;
    border-radius: 0.5rem;
    ${({mode}) => {
        if(mode === "light") {
            return css`
                background-color: ${themeColor.light.surface};
            `
        } else {
            return css`
                background-color: ${themeColor.dark.surface};
            `
        }
    }}
`



export default AccountSettingsDialog;