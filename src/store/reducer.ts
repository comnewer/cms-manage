const defaultState = {
    key:1
}

interface IAction{
    type:string,
    values?:any,
}

export default (state = defaultState, action:IAction) => {
    let newState = JSON.parse(JSON.stringify(defaultState));
    switch(action.type){
        default:
            break;
    }
    return newState;
}