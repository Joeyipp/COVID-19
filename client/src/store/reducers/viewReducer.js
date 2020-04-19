const initState = {
    view: "WORLD"
}

const viewReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_VIEW':
            let { view } = action;
            return {
                ...state,
                view
            }
            
        default:
            return state;
    }
}

export default viewReducer;