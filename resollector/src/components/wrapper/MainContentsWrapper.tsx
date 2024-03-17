import { styled } from 'styled-components';


const MainContentsWrapper = styled.div`
    height: auto;
    @media (min-width: 841px) {
        width: 50rem;
        position: absolute;
        right: 0;
        left: 0;
        margin: auto;
    }
    @media (max-width: 840px) {
        width: 100vw;

    }
`

export default MainContentsWrapper;