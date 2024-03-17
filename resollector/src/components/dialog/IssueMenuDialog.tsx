import { styled } from 'styled-components';

const IssueMenuDialog = styled.dialog`
    height: auto;
    width: auto;
    border: none;
    background-color: transparent;
    &::backdrop {
        background-color: transparent;
    }
`

export default IssueMenuDialog;