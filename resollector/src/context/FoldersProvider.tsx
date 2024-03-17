import { useReducer } from 'react';
import folderReducers from '../reducer/foldersReducer';
import { FoldersContext, FoldersDispatchContext } from './FoldersContext';


function FoldersProvider({ children }: { children: React.ReactNode}) {
    const [folders, dispatch] = useReducer(folderReducers, []);
    
    return(
        <FoldersContext.Provider value={folders}>
            <FoldersDispatchContext.Provider value={dispatch}>
                { children }
            </FoldersDispatchContext.Provider>
        </FoldersContext.Provider>
    )
}

export default FoldersProvider;