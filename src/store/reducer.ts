const defaultState = {
    key:1
}

interface IAction{
    type:string,
    values?:any,
}

 const reducer = (state = defaultState, action:IAction) => {
    let newState = JSON.parse(JSON.stringify(defaultState));
    switch(action.type){
        case 'changeKey':
            newState.key++;
            break;
        default:
            break;
    }
    return newState;
}

export default reducer;