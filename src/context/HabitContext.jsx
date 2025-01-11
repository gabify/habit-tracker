import {createContext, useReducer} from 'react'

export const HabitContext = createContext()

export const habitReducer = (state, action) =>{
    switch(action.type){
        case 'SET_HABIT':
            return{
                habits: action.payload
            }
        case 'CREATE_HABIT':
            return{
                habits: [action.payload, ...state.habits]
            }
        default:
            return state
    }
}

export const HabitContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(habitReducer, {
        habits: null
    })

    return (
        <HabitContext.Provider value={{...state, dispatch}}>
            {children}
        </HabitContext.Provider>
    )
}

export default HabitContextProvider;