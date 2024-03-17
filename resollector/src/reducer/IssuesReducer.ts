
export type Issue = {
    id: number,
    uid: number,
    title: string,
    url: string,
    folderName: string,
    note: string,
}

export type IssueAction = {
    type: string,
    issues: Issue[],
}

function IssuesReducer(issues: Issue[], action: IssueAction) {
    switch(action.type) {
        case "updateAll":
            return action.issues;
    }
    throw Error('Unknown action:' + action.type);
}

export default IssuesReducer;