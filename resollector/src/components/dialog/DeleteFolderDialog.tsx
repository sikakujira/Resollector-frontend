import { styled } from 'styled-components';
import themeColor from '../../utils/themeColor';

type Props = {
    mode: "light"|"dark",
}
const DeleteFolderDialog = styled.dialog<Props>`
        background-color:  
        ${props => (
            props.mode === "light" 
                ? `${themeColor.light.surfaceContainerHigh}` 
                : `${themeColor.dark.surfaceContainerHigh}`
                )};
        width: 20rem;
        height: 10rem;
        border-radius: 1rem;
        border: none;
    `

export default DeleteFolderDialog;