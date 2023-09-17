import React from "react";
import "./Speed.scss";
import { useSelector } from "react-redux";
function Speed() {
  const speed = useSelector((state) => state.createTaskReducer.speed);
  return (
    <div className="speed">
      {speed.length == 0 && (
        <div className="item">
          <div className="para">
            <p>No Time insights</p>
          </div>
        </div>
      )}
      {speed.length != 0 && (
        <>
          {speed?.map((item) => {
            return (
              <div className="item" key={item[0]}>
                <div className="title">{item[1]}</div>
                <div className="para">
                  <p>{item[0]}</p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Speed;
