export default (state, action) => {
    switch(action.type){
        case 'GET_ALL':
            return {
                ...state,
                component: action.payload.component,
                data: action.payload.data,
                meta: action.payload.meta
            }
        case 'INSERT':
            return {
                ...state,
                data: [action.payload.item, ...state.data]
            }
        case 'UPDATE':
            // Change the item with the updated one in the data array
            return {
                ...state,
            }            
        default:
            return state
    }
}