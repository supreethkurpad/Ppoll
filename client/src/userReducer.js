export const initalState = null

export const reducer = (state, action) => {
    if (action.type === "USER") {
        return action.payload;
    }
    if (action.type === "CLEAR") {
        return null;
    }
    return state
}