
export default (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                logged: true,
                user: action.payload.user,
                // role: action.payload.user.role,
                // salesperson_id: action.payload.user.salesperson                
            }
        case 'LOGOUT':
            return {
                ...state,
                logged: false,
                user: {},
                // role: "",
                // salesperson_id: "",
                // email: ""
            }
        case 'USER':
            return {
                ...state,
                user: action.payload.user,
                // role: action.payload.role,
                // salesperson_id: action.payload.salesperson,
                // email: action.payload.email
            }
        case 'ACTIVATE':
            return {
                ...state,
                user: action.payload.user,
                // role: action.payload.role,
                // salesperson_id: action.payload.salesperson,
                // email: action.payload.email
            }
        case 'MESSAGE':            
            return {
                ...state,
                message: action.payload
            }
        case 'CLEAR_MESSAGE':
            return{
                ...state,
                message: undefined
            }
        default:
            return state
    }
}