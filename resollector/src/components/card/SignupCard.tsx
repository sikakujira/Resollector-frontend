import { styled } from 'styled-components';
import CardOutlined from './CardOutlined';

const SignupCard = styled(CardOutlined)`
        height: 30rem;

    @media (min-width: 651px) {
        width: 35rem;
        
    }

    @media (max-width: 650px) {
        width: 90%;
    }
`

export default SignupCard;