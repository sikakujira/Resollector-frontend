import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import { useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthDispatchContext } from '../context/AuthContext';

type RequestOptions = {
    method: string,
    url: string,
    header?: {},
    data?: any
}

type UseFetchResult<T,U> = {
    response: AxiosResponse<T> | null,
    error: AxiosResponse<U> | null,
    isLoading: boolean,
    sendRequest: () => Promise<void>
}

function useFetch<T,U>(options: RequestOptions): UseFetchResult<T,U> {
    const { method, url, header: requestHeader, data: requestBody} = options;

    const [response, setResponse] = useState<AxiosResponse<T> | null>(null);
    const [error, setError] = useState<AxiosResponse<U> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const setIsAuthenticated = useContext(AuthDispatchContext);

    const sendRequest = useCallback(async() => {
        setIsLoading(true);
        setError(null);
        setResponse(null);
        
        try {
            const successResponse = await axiosInstance.request<T>({
                method,
                url,
                headers: requestHeader,
                data: requestBody,
            });
            
            setResponse(successResponse);
        } catch(error) {
            if(axios.isAxiosError(error) && error.response) {
                if(error.response.status === 403) {
                    setIsAuthenticated(false);
                    navigate('/signin');
                }
                setError(error.response);
            }
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    },[requestHeader, requestBody, method, url, navigate, setIsAuthenticated]);

    return {response, error, isLoading, sendRequest};
}

export default useFetch;