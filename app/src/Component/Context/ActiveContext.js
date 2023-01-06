import { createContext, useEffect, useReducer, useState } from "react";
export const ActiveContext = createContext()

export const ActiveContextProvider = ({ children }) => {
    const [active, setActive] = useState(false);
    const InitialState = false
//ChatReducer
    const chatReducer = (state = InitialState, action) => {       
        switch (action.type) {
            case "Turn_ON":
                state = true
                return true
                break;
            case "Turn_OFF":
                state= true
                return false
                break
            default:
                return state
                break;
        }
    }
    const [state, dispatchBtn] = useReducer(chatReducer, InitialState)

    return (
        <ActiveContext.Provider value={{ active: state, dispatchBtn }}>
            {children}
        </ActiveContext.Provider>
    )
}