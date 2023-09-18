import axios from "axios";
export const axiosClient = axios.create({
  baseURL: "https://api.dataforseo.com/v3/on_page",
});
axiosClient.interceptors.request.use((request) => {
  console.log(request, "request at interceptor");
  // console.log(request.data);
  request.auth = {
    username: "aditya.yadav_cs.aiml20@gla.ac.in",
    password: "abb10b7888f05870",
  };
  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  try {
    if (response.data.tasks[0].status_message == "Task Not Found.") {
      return "Task not found";
    }
    if (response.data.tasks[0].result != null) {
      if (response.data.tasks[0].result[0].crawl_progress == "in_progress")
        return "Task in queue";
    }
    return response;
  } catch (e) {
    return Promise.reject(e);
    console.log(e);
  }
});
