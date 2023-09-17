import React from "react";
import "./Checks.scss";
import { Progress } from "antd";
import { useSelector } from "react-redux";
function Checks() {
  const checks = useSelector((state) => state.createTaskReducer.checks);
  return (
    <div className="checks">
      {checks.length == 0 && (
        <div className="item">
          <div className="para">
            <p>No Checks</p>
          </div>
        </div>
      )}
      {checks.length != 0 && (
        <>
          {checks.map((item) => {
            return (
              <div className="item" key={item[0]}>
                <div className="icon">
                  {item[1] ? (
                    <Progress size={50} percent={100} type="circle" />
                  ) : (
                    <Progress
                      size={50}
                      percent={100}
                      status="exception"
                      type="circle"
                    />
                  )}
                </div>
                <div className="titlenpara">
                  <div className="title">{item[0]}</div>
                  <p>
                    {" "}
                    This can negatively impact your page load speed and user
                    experience.
                  </p>
                  {/* {item[1]?<p></p>:<p>This can negatively impact your page load speed and user experience.</p>} */}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Checks;
