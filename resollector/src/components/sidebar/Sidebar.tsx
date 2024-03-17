import SidebarCard from '../card/SidebarCard';
import TextButton from '../button/TextButton';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import AddFolderButton from '../button/AddFolderButton';
import Divider from '../divider/Divider';
import FolderBox from '../box/FolderBox';
import { useContext } from 'react';
import { FoldersContext } from '../../context/FoldersContext';
import FolderList from './FolderList';

type CloseButtonProps = {
    mode: "light"|"dark",
}

const CloseButton = styled(TextButton)<CloseButtonProps>`
        width: 2.5rem;
        height:2.5rem;
        border-radius: 50%;
        top: 3%;
        right: 8%;
`

const SidebarSizeHandle = styled.div`
        width: 0.5rem;
        border: none;
        height: 90%;
        position: absolute;
        top: 5%;
        right: -0.25rem;
        background-color: transparent;
        cursor: ew-resize;
`

type Props = {
    mode: "light"|"dark",
    closeSidebar: () => void,
}

function SideBar(props: Props) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [sidebarWidth, setSidebarWidth] = useState<number>(200);
    const folders  = useContext(FoldersContext);

    useEffect(() => {
        function handleMouseMove(e: MouseEvent): void {
                setSidebarWidth(e.clientX);
        }

        function handleMouseUp(): void {
            setIsDragging(false);
        }
        if(isDragging){
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    },[isDragging]);


    function handleMouseDown(): void {
        setIsDragging(true);
    }

    return(
        <SidebarCard
            mode={props.mode}
            $sidebarWidth={sidebarWidth.toString()}>
        <CloseButton
            mode={props.mode}
            onClick={props.closeSidebar}>
                X
        </CloseButton>
        <SidebarSizeHandle
            onMouseDown={handleMouseDown}
            />
        <Divider
            $top="4rem"
            $width="90%"
            $left="5%"/>
        <FolderBox>
            { folders
                ? folders.map(folder => (
                    <FolderList
                        mode={props.mode}
                        folder={folder}
                        key={folder.id}
                        depth={0}
                        />
                ))
                : null
            }
        </FolderBox>
        <AddFolderButton
            mode={props.mode}/>
        </SidebarCard>
    )
}

export default SideBar;