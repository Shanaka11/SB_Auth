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
            cookies.remove("mahircorrigan")
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
                username: action.payload.user,
                // role: action.payload.role,
                // salesperson_id: action.payload.salesperson,
                // email: action.payload.email
            }
        default:
            return state
    }
}