import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../AxiosClient/axiosClient";
// import axios from "axios";
import { TOAST_FAILURE } from "../App";
// import axios from "axios";
export const searchUrl = createAsyncThunk(
  "seo/searchUrl",
  async (body, thunkAPI) => {
    try {
      // console.log(body);
      thunkAPI.dispatch(setLoading(true))
      

      const response = await axiosClient.post("/task_post", body);

      // console.log(response?.data.tasks[0].id, "response");

      setTimeout(taskCompleted, 30000);
      const data = {
        id: response?.data.tasks[0]?.id,
        limit: 1,
      };
      function taskCompleted() {
        thunkAPI.dispatch(idApiCall({ data }));
      }
    } catch (e) {
      console.log(e);
    } finally {
      // thunkAPI.dispatch(setLoading(false))
    }
  }
);
export const idApiCall = createAsyncThunk(
  "seo/idApiCall",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      let newresponse = await axiosClient.post("/pages", body);
      // console.log(newresponse,'newresponse at frontend');
      if(newresponse=='Task Not Found'){
        thunkAPI.dispatch(showToast({
          type:TOAST_FAILURE,
          message:'Task not found.'
        }))
        newresponse=null
        // return null
      }
      if(newresponse=='in_progress'){
        thunkAPI.dispatch(showToast({
          type:TOAST_FAILURE,
          message:'In Progress.'
        }))
        newresponse=null
        // return null
      }
      
    

      if (newresponse?.data.tasks[0]?.result[0]?.items[0] != null) {
        thunkAPI.dispatch(setDataFound(true));
      }
      const data = {
        url: newresponse?.data.tasks[0]?.result[0]?.items[0]?.url,
        image:
          newresponse?.data.tasks[0]?.result[0]?.items[0]?.meta?.social_media_tags?.[
            "og:image"
          ],
        loadingScore:
          newresponse?.data.tasks[0]?.result[0]?.items[0]?.onpage_score,
        internalLinks:newresponse?.data.tasks[0].result[0].items[0].meta.internal_links_count  ,
        externalLinks:newresponse?.data.tasks[0].result[0].items[0].meta.external_links_count,
        imagesCount:newresponse?.data.tasks[0].result[0].items[0].meta.images_count,
        scripts:newresponse?.data.tasks[0].result[0].items[0].meta.scripts_count,
        scriptsSize:newresponse?.data.tasks[0].result[0].items[0].meta.scripts_size,
        
      };
      thunkAPI.dispatch(setallData(data));
      thunkAPI.dispatch(
        setContent(newresponse?.data.tasks[0]?.result[0]?.items[0]?.meta.content)
      );
      thunkAPI.dispatch(setChecks(newresponse?.data.tasks[0]?.result[0]?.items[0]?.checks))
      thunkAPI.dispatch(setHtags(newresponse?.data.tasks[0]?.result[0]?.items[0]?.meta.htags))
      thunkAPI.dispatch(setSpeed(newresponse?.data.tasks[0]?.result[0]?.items[0]?.page_timing))
      thunkAPI.dispatch(setMediaTags(newresponse?.data.tasks[0]?.result[0]?.items[0]?.meta.social_media_tags))
      return newresponse
    } catch (e) {
      console.log(e);
    }
    finally{
      thunkAPI.dispatch(setLoading(false))
    }
  }
);

const createTask = createSlice({
  name: "createTask",
  initialState: {
    isLoading:false,
    dataFound: false,
    toastData:{},
    allData: {},
    checks: [],
    content: [],
    htags: [],
    mediaTags: [],
    speed: [],
  },
  reducers: {
    showToast:(state,action)=>{
      state.toastData=action.payload
    },
    setLoading:(state,action)=>{
      state.isLoading=action.payload
    },
    setDataFound: (state, action) => {
      state.dataFound = action.payload;
    },
    setallData: (state, action) => {
      state.allData = action.payload;
    },
    setChecks: (state, action) => {
      const newChecks=[]
      for(let i in action.payload){
        newChecks.push([i,action.payload[i]])
      }
      // console.log(newChecks);
      state.checks=newChecks
      // state.checks = action.payload;
    },
    setContent: (state, action) => {
      const newContent=[]
      newContent.push(['Internal Links',state.allData?.internalLinks])
      newContent.push(['External Links',state.allData?.externalLinks])
      newContent.push(['Images Count',state.allData?.imagesCount])
      newContent.push(['Scripts',state.allData?.scripts])
      newContent.push(['Scripts Size',state.allData?.scriptsSize])
      for(let i in action.payload){
        const number=action.payload[i]
        if(number!=null){
          newContent.push([i,action.payload[i].toFixed(2)])
        }
       
        
      }
      // console.log(state.content);
      state.content=newContent
    },
    setHtags: (state, action) => {
      const newHtags=[]
      // console.log(action.payload);
      if(action.payload!=null){
        for(let i in action.payload){
          if(action.payload[i]!=null){
            newHtags.push([i,action.payload[i]])
          }
          
        }
      }
      // console.log(newHtags);
      state.htags = newHtags;
    },
    setMediaTags: (state, action) => {
      const newTags=[]
      for(let i in action.payload){
        if(i=='og:image' || i=='twitter:image')continue
        newTags.push([i,action.payload[i]])
      }
      // console.log(newTags);
      state.mediaTags = newTags;
    },
    setSpeed: (state, action) => {
      const newSpeed=[]
      for(let i in action.payload){
        const number=action.payload[i]
        if(number!=null){
          newSpeed.push([i,action.payload[i]])
        }
       
      }
      // console.log(newSpeed);
      state.speed = newSpeed;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchUrl.fulfilled, (state, action) => {});
  },
});

export default createTask.reducer;

export const {
  showToast,
  setId,
  setallData,
  setChecks,
  setContent,
  setHtags,
  setMediaTags,
  setSpeed,
  setDataFound,
  setLoading
} = createTask.actions;
