
export const initialState = {
    layers: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "layers":
            return {
                ...state,
                layers: action.value
            };
        default:
            return state;
    }
}

export default reducer