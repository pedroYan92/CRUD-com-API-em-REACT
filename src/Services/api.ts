import axios from "axios";


    

const api = axios.create({
    
    
    baseURL: "https://cors-anywhere.herokuapp.com/https://apitesai.azurewebsites.net",
    
   
   
      
})

export default api;



// access-control-allow-credentials: false 
// access-control-allow-headers: Server,X-Powered-By,Date,Content-Length 
// access-control-allow-methods: GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH 
// access-control-allow-origin: * 
// access-control-expose-headers: Server, X-Powered-By, Date, Content-Length 
// content-length: 0 
// content-type: application/json; charset=utf-8 
// date: Mon, 09 Nov 2020 15:03:30 GMT 
// server: Microsoft-IIS/10.0 
// x-content-type-options: nosniff 
// x-powered-by: ASP.NET 