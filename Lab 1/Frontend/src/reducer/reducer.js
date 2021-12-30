const details_form={
    username: null,
    email: null,
    password: null,
    groupname: null,
    groupid: null,
    id: null
}
function reducer(state=details_form,action){
    switch(action.type){
        case "Signup": {
            return{
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password
            }
        }
        case "Login": {
            return{
                email: action.payload.email,
                password: action.payload.password
            }            
        }
        case "Group": {
            return{
                username: action.payload.username,
                groupname: action.payload.groupname,
                groupid: action.payload.groupid,
                id: action.payload.id
            }            
        }

        default:
            return state
    }
}
export default reducer;