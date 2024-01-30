function globalReducer(state, payload) {
    switch (payload.type) {
        case "increment":
            return { ...state, count: state.count + 1 }
        default:
            return state
    }
}

export {
    globalReducer
}