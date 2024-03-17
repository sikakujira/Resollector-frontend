import { styled } from 'styled-components';

const MenuDialog = styled.dialog`
    height: auto;
    width: auto;
    border: none;
    background-color: rgba(0,0,0,0);
    &::backdrop {
        background-color: rgba(0,0,0,0);
        
    }
`

export default MenuDialog;