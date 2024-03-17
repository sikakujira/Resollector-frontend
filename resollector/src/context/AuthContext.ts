import { createContext, Dispatch, SetStateAction } from 'react';


export const AuthContext = createContext<boolean>(false);

export const AuthDispatchContext = createContext<Dispatch<SetStateAction<boolean>>>(
    () => undefined,
);