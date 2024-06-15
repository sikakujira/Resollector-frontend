import HomeContents from './HomeContents';
import FoldersProvider from '../context/FoldersProvider';
import IssuesProvider from '../context/IssuesProvider';
import RefetchIssuesProvider from '../context/RefetchIssuesProvider';


export default function Home() {
    return(
        <FoldersProvider>
            <IssuesProvider>
                <RefetchIssuesProvider>
                    <HomeContents/>
                </RefetchIssuesProvider>
            </IssuesProvider>
        </FoldersProvider>
    )
}