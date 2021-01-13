import { COMMON_ADD_COUNTER } from "./sample.actionType";

const common = (state={}, {type, payload}) => {
    switch(type){
        case COMMON_ADD_COUNTER:
        const prevCount = state.counter;
        return {
            ...state,
            counter: prevCount + payload.counter,
        };
        default:
            return state;
    }
}

export default common;