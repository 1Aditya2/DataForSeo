import React from "react";
import "./Output.scss";

import Checks from "../Component/Checks/Checks";
import Content from "../Component/Content/Content";
import Htags from "../Component/Htags/Htags";
import Speed from "../Component/Speed/Speed";
import { Progress } from "antd";
import MediaTags from "../Component/SocialMediaTags/MediaTags";
import { useSelector } from "react-redux";
function Output() {
  const allData = useSelector((state) => state.createTaskReducer.allData);
  

  return (
    <div className="output">
      <div className="heading">
        Results for:&nbsp;&nbsp;<span>{allData?.url}</span>
        
      </div>

      <div className="on-pagescore">
        <div className="site-img">
          <img src={allData?.image} alt="" />
        </div>
        <div className="score">
          <Progress type="circle" percent={allData?.loadingScore} />
          <p>On-Page Loading Score</p>
        </div>
      </div>
      <div className="on-pageresults">
        <div className="heading">Onpage Results</div>
        <Content />
        <Checks />
      </div>
      <div className="htags-list">
        <div className="heading">H Tags</div>
        <Htags />
      </div>
      <div className="speed-insights">
        <div className="heading">Speed Insights</div>
        <Speed />
      </div>
      <div className="media-tags">
        <div className="heading">Social Media Tags</div>
        <MediaTags />
      </div>
    </div>
  );
}
export default Output;
