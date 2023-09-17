import React from "react";
import "./Htags.scss";
import { useSelector } from "react-redux";
function Htags() {
  const htags = useSelector((state) => state.createTaskReducer.htags);
  return (
    <div className="htags">
      {htags.length == 0 && (
        <div className="item">
          <div className="para">
            <p>No Htags</p>
          </div>
        </div>
      )}
      {htags.length != 0 && (
        <>
          {htags?.map((item) => {
            return (
              <div className="item" key={item[0]}>
                <div className="title">
                  We found #{item[1]?.length} {item[0]} tags
                </div>
                <div className="para">
                  <ul>
                    {item[1].map((each) => {
                      return (
                        <li key={each}>
                          <p>{each}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Htags;
