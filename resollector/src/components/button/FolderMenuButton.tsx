import SecondaryContainerButton from './SecondaryContainerButton';
import { styled } from 'styled-components';
import { MdFolderOpen } from "react-icons/md";
import TextButton from './TextButton';


type LargeButtonProps = {
    mode: "light"|"dark",
    children?: React.ReactNode,
}

const LargeButton = styled(SecondaryContainerButton)<LargeButtonProps>`
        position: fixed;
        @media (max-width: 840px) {
           display: none;
        }
        @media (min-width: 841px) {
            width: 4rem;
            height: 4rem;
            border-radius: 1rem;
            top: 6rem;
            left: 2%;
          
        }
        
`

type SmallButtonProps = {
    mode: "light"|"dark",
    children?: React.ReactNode,
}

const SmallButton = styled(TextButton)<SmallButtonProps>`
        position: fixed;
        @media (max-width: 840px) {
            width: 3rem;
            height: 3rem;
            z-index: 2;
            top: 1rem;
            left: 2rem;
            background-color: transparent;
            border-radius: 1rem;
        }
        @media (min-width: 841px) {
           display: none;
        }
        
`


type FolderMenuButtonProps = {
    mode:"light"| "dark",
    openSidebar: () => void
}

function FolderMenuButton(props: FolderMenuButtonProps) {
    return(
        <>
        <LargeButton
            mode={props.mode}
            onClick={props.openSidebar}
            >
            <MdFolderOpen
                size={30}/>
        </LargeButton>
        <SmallButton
            mode={props.mode}
            onClick={props.openSidebar}
            >
            <MdFolderOpen
                size={30}/>
        </SmallButton>
        </>
    )
}

export default FolderMenuButton;