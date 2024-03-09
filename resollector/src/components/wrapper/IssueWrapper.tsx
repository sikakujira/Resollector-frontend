import { styled } from 'styled-components';


const IssueWrapper = styled.div`
        position: absolute;
        top: 14rem;
        left: 0;
        right: 0;
        margin: 0 auto;
        @media (min-width: 841px) {
            width: 70%;
        }
        @media (max-width: 840px) {
            width: 80%;
        }
        display: flex;
        flex-direction: column;
        height: auto;
`

export default IssueWrapper;