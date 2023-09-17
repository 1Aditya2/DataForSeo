import React from "react";
import "./MediaTags.scss";
import { useSelector } from "react-redux";
function MediaTags() {
  const mediaTags = useSelector((state) => state.createTaskReducer.mediaTags);
  return (
    <div className="mediatags">
      {mediaTags.length == 0 && (
        <div className="item">
          <div className="para">
            <p>No Media Tags</p>
          </div>
        </div>
      )}
      {mediaTags.length != 0 && (
        <>
          {mediaTags.map((item) => {
            return (
              <div className="item" key={item[0]}>
                <div className="title">{item[0]}</div>
                <div className="para">
                  <p>{item[1]}</p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default MediaTags;
