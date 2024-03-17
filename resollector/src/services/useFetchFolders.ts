import { useContext } from 'react';
import axiosInstance from './axiosInstance';
import getCookie from './getCookie';
import { FoldersDispatchContext } from '../context/FoldersContext';

function useFetchFolders() {
    const dispatch = useContext(FoldersDispatchContext);

    async function fetchFolders() {
        try {
            const response = await axiosInstance.request({
                method: 'GET',
                url: '/api/v1/folders',
                headers: {
                    'Contetnt-Type': 'application/json',
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
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