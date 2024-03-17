import { useContext, useState } from 'react';
import { IssuesDispatchContext } from './IssuesContext';
import axiosInstance from '../services/axiosInstance';
import getCookie from '../services/getCookie';
import { AxiosResponse } from 'axios';
import { RefetchIssuesContext, SetQueryContext } from './RefetchIssuesContext';

//issueの更新後に再取得させ最新の状態にする
function RefetchIssuesProvider({ children } : { children : React.ReactNode }) {
    const dispatch = useContext(IssuesDispatchContext);
    const [query, setQuery] = useState<Query>({title: null, folderId: null});

    type Query = {
        title: string | null,
        folderId: number | null,
    }

    type Option = {
        url: string,
        data: { title: string } | number,
    }

    async function fetchIssue(option: Option): Promise<AxiosResponse<any>|undefined> {
        try {
              const response = await axiosInstance.request({
                method: 'POST',
                url: option.url,
                headers: {
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                    'Content-Type': 'application/json',
                },
                data: option.data,
            });
          return response;  
        } catch (e) {
            console.error(e);
        }  
    }

    async function reFetchIssues() {
        let response;
        if(query.title) {
            const option: Option = {
                url: '/api/v1/issues/search/by-title',
                data: {
                    title: query.title
                },
            }
            response = await fetchIssue(option);
        } else if(query.folderId) {
            const option: Option = {
                url: '/api/v1/issues/search/by-folder',
                data: query.folderId,
            }
            response = await fetchIssue(option);
        }
        if(response && response.data) {
            dispatch({type: 'updateAll', issues: response.data});
        }
    }

    return(
        <SetQueryContext.Provider value={setQuery}>
            <RefetchIssuesContext.Provider value={reFetchIssues}>
            { children }
            </RefetchIssuesContext.Provider>
        </SetQueryContext.Provider>
    );
}

export default RefetchIssuesProvider;