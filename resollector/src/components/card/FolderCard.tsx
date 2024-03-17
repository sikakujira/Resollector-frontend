import { styled, css } from 'styled-components';
import { MdOutlineFolder } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useState, useRef, useEffect, useContext } from 'react';
import themeColor from '../../utils/themeColor';
import Box from '../box/Box';
import FolderSettingsCard from './FolderSettingsCard';
import MenuDialog from '../dialog/MenuDialog';
import { Folder } from '../../reducer/foldersReducer';
import useFetch from '../../services/useFetch';
import getCookie from '../../services/getCookie';
import { SetQueryContext } from '../../context/RefetchIssuesContext';
import { IssuesDispatchContext } from '../../context/IssuesContext';
import { Issue } from '../../reducer/IssuesReducer';

type CardProps = {
    mode: "light"|"dark",
}

const Card = styled.div<CardProps>`
    width: auto;
    height: 1.5rem;
    &:focus {
        &::before {
            content:"";
            width: 100%;
            height: 1.5rem;
            background-color: 
                ${props => props.mode === "light"
                    ? `${themeColor.light.primary}`
                    : `${themeColor.dark.primary}`
                };
            opacity: 8%;
            position: absolute;
        }
    }
`

const FolderContents = styled.div<{$left: string}>`
    height: 100%;
    width: auto;
    background: transparent;
    border: none;
    display: flex;
    position: absolute;
    left: ${props => props.$left}px;
`

const ArrowButton = styled.button<{mode:"light"|"dark"}>`
    width: 1.5rem;
    height: 1.5rem;
    background-color: transparent;
    border: none;
    border-radius: 0.2rem;
    color: 
        ${props => props.mode === "light"
            ? `${themeColor.light.primary}`
            : `${themeColor.dark.primary}`
        };
    padding: 1px;
`
const FolderIcon = styled.div<{mode: "light"|"dark"}>`
    color: 
        ${props => props.mode === "light"
            ? `${themeColor.light.primary}`
            : `${themeColor.dark.primary}`
        };
    border: none;
    width: 1.5rem;
    height: 1.3rem;
    padding: 1px;
`

const FolderTitleBox = styled(Box)`
        overflow: hidden;
        white-space: nowrap;
        cursor: default;
`

const FolderSettingsButton = styled.button<{mode:"light"|"dark", $isOpen: boolean}>`
    border: none;
    outline: none;
    background-color: transparent;
    height: 1.5rem;
    width: 1.5rem;
    padding: 1px;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    position: absolute;
    &:hover { 
        &::before {
            content:"";
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color:
                ${props => props.mode === "light"
                    ? `${themeColor.light.primary}`
                    : `${themeColor.dark.primary}`};
            opacity: 8%;   
            position: absolute;
            top:0;
            left:0;   
        }
    }
    &:active {
        &::before {
            content:"";
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color:
                ${props => props.mode === "light"
                    ? `${themeColor.light.primary}`
                    : `${themeColor.dark.primary}`};
            opacity: 10%;  
            position: absolute;
            top:0;
            left:0;   
        }
    }
    ${props => props.$isOpen
        ? css`
            &::before {
                content:"";
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color:
                ${props.mode === "light"
                    ? `${themeColor.light.primary}`
                    : `${themeColor.dark.primary}`};
                opacity: 10%;
                position: absolute;
                top:0;
                left:0;   
            }`
        : null};
    color: ${props => props.mode === "light"
                ? `${themeColor.light.primary}`
                : `${themeColor.dark.primary}`};
`

const FolderSettingButtonBox = styled(Box)`
    width: 1.5rem;
    height: 1.5rem;
    position: static;
    overflow: hidden;
    margin-right: 10px;
`

const SettingsMenuDialog = styled(MenuDialog)<{$top: string, $left: string}>`
        position: absolute;
        top: ${props => props.$top}px;
        left: ${props => props.$left}px;
        padding: 0;
        margin: 0;
`

type FolderCardProps = {
    mode: "light"|"dark",
    folder: Folder,
    toggleFolderList: () => void,
    depth: number,
}

function FolderCard(props: FolderCardProps) {
    const [isOpenChild, setIsOpenChild] = useState<boolean>(false);
    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);
    const [settingsMenuLocation, setSettingsMenuLocation] = useState<Location>({locationTop: "", locationLeft: ""});
    const dialogRef = useRef<HTMLDialogElement>(null);
    const settingsButtonRef = useRef<HTMLButtonElement>(null);
    const { folder } = props; 
    const [isResponseEffect, setIsResponseEffect] = useState<boolean>(false);
    const setQuery = useContext(SetQueryContext);
    const issuesDispatch = useContext(IssuesDispatchContext);
    const [isRefresh, setIsRefresh] = useState(false);

    const option = {
        method: 'POST',
        url: '/api/v1/issues/search/by-folder',
        header: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        },
        data: folder.id,
    }

    const { response, sendRequest } = useFetch<Issue[], unknown>(option);

    useEffect(() => {
        if(isResponseEffect) {
            if(response && (response.status === 200)) {
                issuesDispatch({type: 'updateAll', issues: response.data});
                setIsResponseEffect(false);
            }
        }
    }, [response, isResponseEffect, issuesDispatch]);

    useEffect(() => {
        if(isRefresh) {
            sendRequest(); 
            setIsResponseEffect(true);
            setIsRefresh(false);
        }
    }, [sendRequest, isRefresh]);

    type Location = {
        locationTop: string,
        locationLeft: string,
    }

    function handleArrowButton(): void {
        setIsOpenChild(!isOpenChild);
        props.toggleFolderList();
    }

    function handleOpenSettings(): void {
        if(dialogRef.current && settingsButtonRef.current) {
        const targetRect = settingsButtonRef.current.getBoundingClientRect();
        setSettingsMenuLocation({
            locationTop: (targetRect.top + 20 ).toString(),
            locationLeft: (targetRect.left + 20).toString()
        });
        dialogRef.current.showModal();
        setIsOpenSettings(true);
        }
    }

    function closeSettings(): void {
        if(dialogRef.current) {
            dialogRef.current.close();
            setIsOpenSettings(false);
        }
    }

    function handleFocus():void {
        setQuery({title: null, folderId: folder.id});
        setIsRefresh(true);
    }


    return(
        <Card
            mode={props.mode}
            tabIndex={0}
            onFocus={handleFocus}>
            <FolderContents
                $left={(props.depth * 10).toString()}>
                <ArrowButton
                    onClick={handleArrowButton}
                    mode={props.mode}>
                    {isOpenChild
                        ? <MdKeyboardArrowDown
                            size={20}/>
                        : <MdKeyboardArrowRight
                            size={20}/>
                    }
                </ArrowButton>
                <FolderIcon
                    mode={props.mode}>
                    <MdOutlineFolder
                        size={20}/>
                </FolderIcon>
                <FolderTitleBox
                    $color={props.mode}
                    $position="static"
                    $padding="1px 3px"
                    width="auto">
                {folder.name}
                </FolderTitleBox>
                <FolderSettingButtonBox>
                    <FolderSettingsButton
                        mode={props.mode}
                        onClick={handleOpenSettings}
                        $isOpen={isOpenSettings}
                        ref={settingsButtonRef}>
                        <MdOutlineMoreHoriz
                            size={20}/>
                    </FolderSettingsButton>
                </FolderSettingButtonBox>
                   <SettingsMenuDialog
                        ref={dialogRef}
                        onClick={closeSettings}
                        $left={settingsMenuLocation.locationLeft}
                        $top={settingsMenuLocation.locationTop}>
                        <FolderSettingsCard
                            mode={props.mode}
                            folder={folder}
                            closeSettings={closeSettings}
                            />
                    </SettingsMenuDialog>
            </FolderContents>
        </Card>
    )
}

export default FolderCard;