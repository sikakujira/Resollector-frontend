import { createContext } from 'react';
import { Issue, IssueAction } from '../reducer/IssuesReducer';

export const IssuesContext = createContext<Issue[]>([]);

export const IssuesDispatchContext = createContext<React.Dispatch<IssueAction>>(() => undefined);