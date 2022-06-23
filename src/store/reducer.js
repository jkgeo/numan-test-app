
export const initialState = {
    results: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "results":
            return {
                ...state,
                results: action.value
            };
        default:
            return state;
    }
}

export default reducer