import { createContext, Dispatch, SetStateAction } from 'react';

export const RefetchIssuesContext = createContext<() => void>(() => undefined);

export const SetQueryContext = createContext<Dispatch<SetStateAction<Query>>>(() => undefined);

type Query = {
    title: string | null,
    folderId: number | null,
}