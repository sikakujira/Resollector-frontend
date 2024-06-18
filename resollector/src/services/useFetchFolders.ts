import { useContext } from 'react';
import axiosInstance from './axiosInstance';
import { FoldersDispatchContext } from '../context/FoldersContext';

function useFetchFolders() {
    const dispatch = useContext(FoldersDispatchContext);

    async function fetchFolders() {
        const token = localStorage.getItem('token') !== undefined ? localStorage.getItem('token') : null;
        try {
            const response = await axiosInstance.request({
                method: 'GET',
                url: '/api/v1/folders',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });
            dispatch({type: "updatedAll", folders: response.data});
        } catch(e) {
            console.error(e);
        }
    }
    return fetchFolders
}

export default useFetchFolders;