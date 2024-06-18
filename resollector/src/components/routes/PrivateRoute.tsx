import Home from '../../pages/Home';
import { Navigate } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext, AuthDispatchContext } from '../../context/AuthContext';
import Loading from '../../pages/Loading';
import useFetch from '../../services/useFetch';


function PrivateRoute() {
    const isAuthenticated = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const setIsAuthenticated = useContext(AuthDispatchContext); 
    const isFirstRender = useRef(true);

    const option = {
        method: 'POST',
        url: '/api/v1/auth/check',
    }

    const {response, error, sendRequest} = useFetch(option);

    useEffect(() => {
        if(isFirstRender.current) {
            sendRequest();
            isFirstRender.current = false;
        }
    }, [sendRequest]);

    useEffect(() => {
        if(response && response.status === 200) {
            setIsAuthenticated(true);
            setIsLoading(false);
        } else if(error) {
            setIsLoading(false);
        }
    }, [error, response,setIsAuthenticated]);
    


    if(isLoading) {
        return <Loading/>
    }

    return isAuthenticated ? (<Home/>): (<Navigate to="/signin" />);
}

export default PrivateRoute;