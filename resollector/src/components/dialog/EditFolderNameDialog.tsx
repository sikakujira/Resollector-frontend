import { styled } from 'styled-components';
import themeColor from '../../utils/themeColor';

type Props = {
    mode: "light"|"dark",
}
const EditFolderNameDialog = styled.dialog<Props>`
        background-color:  
        ${props => (
            props.mode === "light" 
                ? `${themeColor.light.surfaceContainerHigh}` 
                : `${themeColor.dark.surfaceContainerHigh}`
                )};
        width: 20rem;
        height: 12rem;
        border-radius: 1rem;
        border: none;
    `

export default EditFolderNameDialog;