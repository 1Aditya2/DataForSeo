import React, { useState } from "react";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { searchUrl } from "../Redux/DataForSeoSlice";
import Output from "../Output/Output";
function Home() {
  const [target,settarget]=useState(null)
  const dataFound=useSelector(state=>state.createTaskReducer.dataFound)
  const dispatch=useDispatch()
  function handleClick(){
   
    dispatch(searchUrl({
      data:{
        target,
        max_crawl_pages: 1,
        load_resources: true,
        enable_javascript: true,
        enable_browser_rendering:true,
        custom_js: "meta = {}; meta.url = document.URL; meta;", 
      }
    }))
  }
  function handleChange(e){
    settarget(e.target.value)
  }

  return (
    <div className="home">
       <div className="hero">
       <div className="image">
          <img src="https://dataforseo.com/wp-content/uploads/2018/05/on-page-api.png" alt="" />
       </div>
       <div className="search-box">
           <input
            type="text"
            placeholder="website url"
            onChange={handleChange}
          />
          <input
            type="button"
            value="Get Free SEO Audit Report"
            className="button"
            onClick={handleClick}
          />
        </div>
      </div>
      {dataFound?<Output/>:null}
      
    </div>
  )
}

export default Home;
