import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import Background from '../components/background/Background';
import Header from '../components/header/Header';
import FAB from '../components/button/FAB';
import AddIssueDialog from '../components/dialog/AddIssueDialog';
import AddIssueContents from '../components/dialog/contents/AddIssueContents';
import SearchBar from '../components/searchbar/SearchBar';
import MainContentsWrapper from '../components/wrapper/MainContentsWrapper';
import IssueCard from '../components/card/IssueCard';
import IssueWrapper from '../components/wrapper/IssueWrapper';
import FolderMenuButton from '../components/button/FolderMenuButton';
import Sidebar from '../components/sidebar/Sidebar';
import { IssuesContext } from '../context/IssuesContext';
import useFetchFolders from '../services/useFetchFolders';

export default function HomeContents() {
    const [mode, setMode] = useState<"light" | "dark">("light");
    const addIssueDialogRef = useRef<HTMLDialogElement>(null);
    const [isSidebar, setIsSidebar] = useState<boolean>(false);
    const issues = useContext(IssuesContext);
    const fetchFolders = useFetchFolders();
    const [isFetchFolders, setIsFetchFolders] = useState<boolean>(true);

   
    useEffect(() => {
        if(isFetchFolders) {
            fetchFolders();
            setIsFetchFolders(false);
        }
    },[fetchFolders, isFetchFolders]);

    function handleClickTheme(): void {
            if(mode === "light") {
                setMode("dark");
            } else {
                setMode("light");
            }
    }

    function openSidebar(): void {
        setIsSidebar(true);
    }

    function closeSidebar(): void {
        setIsSidebar(false);
    }

    function openAddIssueDialog(): void {
        if(addIssueDialogRef.current) {
            addIssueDialogRef.current.showModal();
        }
    }


    const closeAddIssueDialog = useCallback((): void => {
        if(addIssueDialogRef.current) {
            addIssueDialogRef.current.close();
        }
    },[]);

    return(
        <>
        <Background 
            mode={mode}
            />
            <Header 
                mode={mode} 
                login={true}
                onClickTheme={handleClickTheme}
                /> 
            { isSidebar
                ?   <Sidebar 
                        mode={mode}
                        closeSidebar={closeSidebar}
                        />
                :   <FolderMenuButton
                        mode={mode}
                        openSidebar={openSidebar}
                        />
            } 
            <MainContentsWrapper>
            <SearchBar
                mode={mode}
                />
                <IssueWrapper>
                    {issues
                        ? issues.map(issue => (
                            <IssueCard
                                mode={mode}
                                issueId={issue.id}
                                issueTitle={issue.title}
                                issueURL={issue.url}
                                issueNote={issue.note}
                                folderName={issue.folderName}
                                key={issue.id}
                            />
                        ))
                        : null }
                </IssueWrapper>
            </MainContentsWrapper>
            <FAB
                bottom="5%"
                right="3.5%"
                mode={mode}
                onClick={openAddIssueDialog}
                />
            <AddIssueDialog
                mode={mode}
                ref={addIssueDialogRef}
                onClick={closeAddIssueDialog}
                >
                <AddIssueContents
                    mode={mode}
                    onClick={closeAddIssueDialog}
                    />
            </AddIssueDialog>
        </>
    )
}