import { AuthContext, AuthDispatchContext } from './AuthContext';
import { useState } from 'react';


function AuthProvider({ children } : { children : React.ReactNode }) {
    const [ isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    return(
        <AuthContext.Provider value={isAuthenticated}>
            <AuthDispatchContext.Provider value={setIsAuthenticated}>
                 { children }
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;