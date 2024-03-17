

export type Folder = {
    id: number,
    name: string,
    parentId?: number,
    uid?: number,
    children: Folder[],
}

export type FolderAction = {
    type: string,
    folders: Folder[],
}

function foldersReducer(folders: Folder[], action: FolderAction) {
    switch(action.type) {
        case "updatedAll":
            return action.folders; 
    }
    throw Error('Unknown action: ' + action.type);
}


export default foldersReducer;

