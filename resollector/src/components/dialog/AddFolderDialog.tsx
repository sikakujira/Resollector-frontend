import { styled } from 'styled-components';
import themeColor from '../../utils/themeColor';

type Props = {
    mode:"light"|"dark",
}

const AddFolderDialog = styled.dialog<Props>`
    width: 20rem;
    height: 13rem;
    border: none;
    background-color:
    ${props => props.mode === "light"
        ? `${themeColor.light.surfaceContainerHigh}`
        : `${themeColor.dark.surfaceContainerHigh}`
    };
    border-radius: 1rem;
`


export default AddFolderDialog;