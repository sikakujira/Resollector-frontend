import { createContext } from 'react';
import { Folder, FolderAction } from '../reducer/foldersReducer';



export const FoldersContext = createContext<Folder[]>([]);

export const FoldersDispatchContext = createContext<React.Dispatch<FolderAction>>(() => undefined);

