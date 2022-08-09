const INITIAL_STATE = {
    idPost : 0
}

export const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "POST_SUCCESS":
            return {...state, ...action.payload};
        default:
            return state;
    }
}