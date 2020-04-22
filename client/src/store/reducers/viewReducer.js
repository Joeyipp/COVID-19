const initState = {
    view: "WORLD",
    viewChange: false
}

const viewReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_VIEW':
            let { view } = action;
            return {
                ...state,
                view,
                viewChange: !state.viewChange
            }
            
        default:
            return state;
    }
}

export default viewReducer;