import { styled } from 'styled-components';
import themeColor from '../../utils/themeColor';

const IssueNote = styled.div<{mode: "light"|"dark"}>`
        position: relative;
        top: 105%;
        width: auto;
        box-sizing: border-box;
        padding: 2rem;
        border-radius: 0.8rem;
        background-color: ${props => (
            props.mode === "light"
            ? themeColor.light.surfaceContainerLow
            : themeColor.dark.surfaceContainerLow
        )};
        color: ${props => (
            props.mode === "light"
            ? themeColor.light.onSurfaceVariant
            : themeColor.dark.onSurfaceVariant
        )};
        box-shadow: 1px 1px 8px -6px;
        z-index: 30;
        white-space: pre-wrap; 
`

export default IssueNote;