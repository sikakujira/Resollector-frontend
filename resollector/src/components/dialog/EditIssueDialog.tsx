import { styled } from 'styled-components';
import themeColor from '../../utils/themeColor';

type Props = {
    mode: "light"|"dark"
}

const EditIssueDialog = styled.dialog<Props>`
        background-color:  
        ${props => (
            props.mode === "light" 
                ? `${themeColor.light.surfaceContainerHigh}` 
                : `${themeColor.dark.surfaceContainerHigh}`
                )};
        width: 40rem;
        height: 40rem;
        border-radius: 3rem;
        border: none;
`

export default EditIssueDialog;