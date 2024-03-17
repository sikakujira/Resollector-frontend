import FolderCard from '../card/FolderCard';
import { useState } from 'react';
import { Folder } from '../../reducer/foldersReducer';


type FolderProps = {
    mode: "light"|"dark",
    folder: Folder,
    depth: number,
}

function FolderList(props: FolderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function toggleFolderList(): void {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <FolderCard
                mode={props.mode}
                folder={props.folder}
                toggleFolderList={toggleFolderList}
                depth={props.depth}
                />
            {isOpen && props.folder.children.length > 0 
                ? props.folder.children.map(child => (
                    <FolderList 
                        mode={props.mode} 
                        folder={child}
                        key={child.id}
                        depth={props.depth + 1}/>
                ))
                : null }
        </>
        ) 
}

export default FolderList;