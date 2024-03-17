import { styled, css } from 'styled-components';
import Box from '../box/Box';
import themeColor from '../../utils/themeColor';
import { MdOutlineSearch } from "react-icons/md";
import TextButton from '../button/TextButton';
import { useState, useContext, useEffect } from 'react';
import useFetch from '../../services/useFetch';
import { IssuesDispatchContext } from '../../context/IssuesContext';
import getCookie from '../../services/getCookie';
import { Issue } from '../../reducer/IssuesReducer';
import { SetQueryContext } from '../../context/RefetchIssuesContext';


const SearchWrapper = styled.div<{mode:"light"|"dark"}>`
        position: absolute;
        height: 3rem;
        top: 8rem;
        margin: 0 auto;
        left: 0;
        right: 0;
        border-radius: 2rem;
        ${props => {
            if(props.mode === "light") {
                return css`
                    background-color: ${themeColor.light.surfaceContainerHigh};
                `
            } else {
                return css`
                    background-color: ${themeColor.dark.surfaceContainerHigh};
                `
            }
        }};
        @media (min-width: 841px) {
            width: 80%;
        }
        @media (max-width: 840px) {
            width: 90%;
        }
`


const SearchButton = styled(TextButton)`
        color: ${props => props.mode === "light"
                ? `${themeColor.light.onSurface}`
                : `${themeColor.dark.onSurface}`
        }
`


type InputProps = {
    mode: "light"|"dark",
}

const Input = styled.input<InputProps>`
        position: absolute;
        left: 3rem;
        width: 80%;
        height: 100%;
        border: none;
        outline: none;
        font-size: 20px;
        background-color: transparent;
        ${props => {
            if(props.mode === "light") {
                return css`
                    color: ${themeColor.light.onSurfaceVariant};
                `
            } else {
                return css`
                    color: ${themeColor.dark.onSurfaceVariant};
                `
            }
        }};
        @media (min-width: 501px) {
            width: 80%;
        }
        @media (max-width: 500px) {
            width: 65%;
        }
`

type SearchBarProps = {
    mode: "light"|"dark",
}

function SearchBar(props: SearchBarProps) {
    const [value, setValue] = useState<string>("");
    const issuesDispatch = useContext(IssuesDispatchContext);
    const [refresh, setRefresh] = useState<boolean>(false);
    const setQuery = useContext(SetQueryContext);

    const option = {
        method: 'POST',
        url: 'api/v1/issues/search/by-title',
        header: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        data: {
            title: value
        },
    }

    const {response, sendRequest} = useFetch<Issue[], unknown>(option);

    useEffect(() => {
        if(response && (response.status === 200)) {
            issuesDispatch({type: 'updateAll', issues: response.data});
        }
    }, [response, issuesDispatch]);

    useEffect(() => {
        //他のリクエストを挟むとcsrfトークンが変わってしまうため、再レンダリングで取得し直す
        if(refresh) {
            sendRequest();
            setRefresh(false);
        }
    },[refresh, sendRequest]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value);
    }

    function deleteSearch(): void {
        setValue("");
    }

    function handleSubmit(): void {
        setRefresh(true);
        setQuery({title: value, folderId: null});
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
        if(e.key === 'Enter') {
            setRefresh(true);
            setQuery({title: value, folderId: null});
        }
    }

    return(
            <SearchWrapper
                mode={props.mode}
                >
                <Box
                    $left="0.5%"
                    $top="15%"
                    >
                <SearchButton
                    mode={props.mode}
                    onClick={handleSubmit}>
                    <MdOutlineSearch
                            size={30}
                            />
                </SearchButton>
                </Box>
                <Input
                    mode={props.mode}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    />
                {value          
                    ?  <TextButton
                        width="2.5rem"
                        height="2.5rem"
                        top="0.3rem"
                        right="0"
                        mode={props.mode}
                        content="X"
                        onClick={deleteSearch}
                        />
                    : null
                }  
            </SearchWrapper>
    )
}

export default SearchBar;