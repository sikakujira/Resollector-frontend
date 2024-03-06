import { useState, useRef } from 'react';
import Background from '../components/background/Background';
import Header from '../components/header/Header';
import FAB from '../components/button/FAB';
import AddIssueDialog from '../components/dialog/AddIssueDialog';
import AddIssueContents from '../components/dialog/contents/AddIssueContents';
import SearchBar from '../components/searchbar/SearchBar';
import MainContentsWrapper from '../components/wrapper/MainContentsWrapper';
import IssueCard from '../components/card/IssueCard';

export default function Home() {
    const [mode, setMode] = useState<"light" | "dark">("light");
    const addIssueDialogRef = useRef<HTMLDialogElement>(null);

    function handleClickTheme(): void {
            if(mode === "light") {
                setMode("dark");
            } else {
                setMode("light");
            }
    }

    function openAddIssueDialog(): void {
        if(addIssueDialogRef.current) {
            addIssueDialogRef.current.showModal();
        }
    }

    function closeAddIssueDialog(): void {
        if(addIssueDialogRef.current) {
            addIssueDialogRef.current.close();
        }
    }

    return(
        <Background 
            mode={mode}
            >
            <Header 
                mode={mode} 
                login={true}
                onClickTheme={handleClickTheme}
                />
            <MainContentsWrapper>
            <SearchBar
                mode={mode}
                />
            <IssueCard
                mode={mode}
                />
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
        </Background>
    )
}