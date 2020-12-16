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