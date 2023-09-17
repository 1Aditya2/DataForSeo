import axios from "axios";
// import store from  '../Redux/store'
// import { showToast } from "../Redux/DataForSeoSlice";
// import { TOAST_FAILURE } from "../App";

export const axiosClient = axios.create({
  baseURL:'https://api.dataforseo.com/v3/on_page',
  // withCredentials: true,
});
axiosClient.interceptors.request.use((request) => {
  // console.log(request, "request at interceptor");
  // console.log(request.data);
  request.auth = {
    username: "aditya.yadav_cs.aiml20@gla.ac.in",
    password: "abb10b7888f05870",
  };
  return request;
});
axiosClient.interceptors.response.use(async (response) => {
  // console.log(response,'response at interceptor');
  try {
    if(response.data?.tasks[0]?.status_message=='Task Not Found.'){
      
      return 'Task Not Found';
    }
    if(response.data.tasks[0].result!=null){
      if(response.data.tasks[0].result[0].crawl_progress=='in_progress'){
        
        return 'In Progress'
      }
    }
    return response
  } 
  catch (e) {
    // return Promise.reject(e)
    // console.log(e);
  }

  // return response
});
