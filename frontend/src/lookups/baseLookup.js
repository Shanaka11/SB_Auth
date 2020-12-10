import jwt from 'jwt-decode'

// Get Cookie Function
const getCookie = (name) => {
    var cookieValue = null
    if(document.cookie && document.cookie !== ""){
        var cookies = document.cookie.split(';')
        for(var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim()
            if(cookie.substring(0, name.length + 1) === (name + '=')){
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue
}

export const logged = () => {
    const temp = getCookie("mahircorrigan")
    return temp
}

export const getLoggedUserInfo = () => {
    const temp = getCookie("userinfologged")
    if (temp) {
        const user = jwt(temp)
        console.log(user)
        return user
    }else{
        return {}
    }
}
export function backendLookup(method, endpoint, callback, data, media){

        let jsonData;
        const formData = new FormData()
        if (data){
            jsonData = JSON.stringify(data)
        }
        const xhr = new XMLHttpRequest()
        // const url = `http://localhost:8000/api${endpoint}` 
        const url = `http://127.0.0.1:8000/api${endpoint}` 
    
        xhr.responseType = "json"
        xhr.open(method, url)
        if(media){
            formData.append('doc', data.doc)
            if(data.username){
                formData.append('username', data.username)
                formData.append('password', data.password)
            }
        }else{
            xhr.setRequestHeader("Content-Type", "application/json")
        }        
        // Check first if the user is already logged in
        // Add CSRF tokens as well
        const csrf = getCookie("csrftoken")
        if(csrf){
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
            xhr.setRequestHeader("X-CSRFToken", csrf)
        }
        xhr.withCredentials = true
        xhr.onload = function(){
            callback(xhr.response, xhr.status)
        }
    
        xhr.onerror = function(e) {
            callback({"message": "The request was an error"}, 400)
        }
        if(media){
            xhr.send(formData)  
        }else{
            xhr.send(jsonData)  
        }
          
}

// // Change the method name to something like restrictedBackend
// export function restrictedBackend(method, endpoint, callback, data, media){
//     // use the global variable 'token' instead of currToken
//     let getNewAccessToken = true
//     let token = localStorage.getItem("token") ? localStorage.getItem("token") : null

//     if(token){
//         const decodedToken = jwt_decode(token)
//         // Check if the token is expired if so get a new one
//         if(decodedToken.exp > Date.now()/1000){
//             getNewAccessToken = false
//         }
//     }
//     // Check if the logged is true in the client storage before getting the new token
//     if(getNewAccessToken && localStorage.getItem("token")){
//         const xhr = new XMLHttpRequest()
//         const url = `http://localhost:8000/api/user/refresh`
//         xhr.responseType = "json"        

//         // Check the token to see if its expiered if expiered fetch a new one via the refresh token
//         // Send the refresh token with this request and get a new access token
//         xhr.open('POST', url)
//         xhr.setRequestHeader("Content-Type", "application/json")   
//         xhr.withCredentials = true     
//         xhr.onload = function (){
//             // console.log(xhr.response.access)
//             if(xhr.response){
//                 localStorage.setItem("token", xhr.response.access)
//                 backendLookup(method, endpoint, callback, data)
//             }else{
//                 localStorage.removeItem("token")
//             }
//         }   

//         xhr.onerror = function(e) {
//             console.log(e)
//         }
//         xhr.send()
//     }else{
//         backendLookup(method, endpoint, callback, data, media)
//     }

// }