<<<<<<< HEAD
import HomeContents from './HomeContents';
import FoldersProvider from '../context/FoldersProvider';
import IssuesProvider from '../context/IssuesProvider';
import RefetchIssuesProvider from '../context/RefetchIssuesProvider';
=======
import { useState, useRef } from 'react';
import Background from '../components/background/Background';
import Header from '../components/header/Header';
import FAB from '../components/button/FAB';
import AddIssueDialog from '../components/dialog/AddIssueDialog';
import AddIssueContents from '../components/dialog/contents/AddIssueContents';
import SearchBar from '../components/searchbar/SearchBar';
import MainContentsWrapper from '../components/wrapper/MainContentsWrapper';
import IssueCard from '../components/card/IssueCard';
import IssueWrapper from '../components/wrapper/IssueWrapper';
>>>>>>> 9abf34c (フォルダ機能前)

export default function Home() {
    return(
<<<<<<< HEAD
        <FoldersProvider>
            <IssuesProvider>
                <RefetchIssuesProvider>
                    <HomeContents/>
                </RefetchIssuesProvider>
            </IssuesProvider>
        </FoldersProvider>
=======
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
                <IssueWrapper>
                    <IssueCard
                        mode={mode}
                        issueId="1"
                        issueTitle="sampleIssue サンプル"
                        issueNote="sampleissuenoteだああああああああああああ\nいああああああああああああああああああああ"
                        issueURL="https://chat.openai.com/"
                        />
                    <IssueCard
                        mode={mode}
                        issueId="2"
                        issueTitle="sampleIssue サンプル2"
                        issueNote={`sampleissuenote2\n\n どうかな`}
                        issueURL="https://chat.openai.com/"
                        />
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
        </Background>
>>>>>>> 9abf34c (フォルダ機能前)
    )
}