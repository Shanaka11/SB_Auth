import {apiGetUsers, ApiRegisterUser, ApiUpdateUser} from '../lookups'

const crudHandle = (operation, callback, data) => {
    switch (operation){
        case "GET_LIST":
            // Get a list of records
            return apiGetUsers(callback)            
        case "GET":
            // Get a single record
            break;
        case "INSERT":
            // Data will be the new record
            return ApiRegisterUser(callback, data)
        case "UPDATE":
            // Data will have id + any fields that were updated
            return ApiUpdateUser(data.id, callback, data)
        case "DELETE":
            // Data will have id that needs to be deleted
            break;
        case "BULK_DELETE":
            // Data will have an array of ids
            break;
    }
}




export const meta = 
    {
        "name":"username",
        "labels": ["Id", "Username", "Email", "First Name", "Last Name"],
        "crudHandle": crudHandle, //This will handle Create Update Delete Buld Delete Actions
        "state":{
                    "id":"",
                    "username":"",
                    "email": "",
                    "first_name": "",
                    "last_name": "",
                    "verified": "",
                },
        "read_only_state":{
            "password":"",
            "password2": ""
        },
        "form":{
            "title": "",
            // These fields will only be there when a new record is created
            "read_only_fields": [
                {
                    "type":"text",
                    "name": "username",
                    "placeholder": "Username",
                    "reset": "FALSE",
                    "required": true
                },
                {
                    "type":"password",
                    "name": "password",
                    "placeholder": "Password",
                    "reset": "FALSE",
                    "required": true
                },      
                {
                    "type":"password",
                    "name": "password2",
                    "placeholder": "Confirm Password",
                    "reset": "FALSE",
                    "required": true
                }                
            ],
            "fields": [ 
                {
                    "type":"email",
                    "name": "email",
                    "placeholder": "Email",
                    "reset": "FALSE",
                    "required": true
                },                
                {
                    "type":"text",
                    "name": "first_name",
                    "placeholder": "First Name",
                    "reset": "FALSE",
                    "required": false
                },
                {
                    "type":"text",
                    "name": "last_name",
                    "placeholder": "Last Name",
                    "reset": "FALSE",
                    "required": false
                },
                {
                    "type":"text",
                    "name": "verified",
                    "placeholder": "Verified",
                    "reset": "FALSE",
                    "required": false
                }                              
            ]
        }
    }
export default meta