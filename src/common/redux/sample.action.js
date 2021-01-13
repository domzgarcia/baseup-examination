import { COMMON_ADD_COUNTER } from "./sample.actionType"

export const commonHandleAddCounter = () => {
    return {
        type: COMMON_ADD_COUNTER,
        payload: {
            counter: 1,
        },
    }
}