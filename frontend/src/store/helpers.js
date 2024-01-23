function globalReducer(state, payload) {
    switch (payload.type) {
        case "text":
            return { ...state, text: payload.value }
        case "range":
            return { ...state, range: payload.value }
        case "decrement":
            return { ...state, counter: state.counter - 1 }
        case "increment":
            return { ...state, counter: state.counter + 1 }
        default:
            return state
    }
}


export {
    globalReducer
}