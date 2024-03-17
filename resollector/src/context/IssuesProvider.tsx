import { useReducer } from 'react';
import { IssuesContext, IssuesDispatchContext } from './IssuesContext';
import IssuesReducer from '../reducer/IssuesReducer';

function IssueProvider({ children }: { children: React.ReactNode}) {
    const [issues, dispatch] = useReducer(IssuesReducer, []);

    return(
        <IssuesContext.Provider value={issues}>
            <IssuesDispatchContext.Provider value={dispatch}>
                {children}
            </IssuesDispatchContext.Provider>
        </IssuesContext.Provider>
    )
}

export default IssueProvider;