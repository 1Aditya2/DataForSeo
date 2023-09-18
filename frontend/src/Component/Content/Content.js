import React from "react";
import "./Content.scss";
import { useSelector } from "react-redux";
function Content() {
  const content = useSelector((state) => state.createTaskReducer.content);

  return (
    <div className="content">
      {content.length==0 && <div className="item">
        <div className="para"><p>No Content</p></div></div>}
      {content.length!=0 && <>
      {content?.map((item) => {
        return (
          <div className="item" key={item[0]}>
            <div className="title">{item[1]}</div>
            <div className="para"> <p>{item[0]}</p></div>
           
          </div>
        );
      })}
      </>
      }

     
      
      
    </div>
  );
}

export default Content;
