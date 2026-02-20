import { React, useState, useEffect } from "react";
import "./Eventcard.css";
import { Link, useNavigate } from "react-router-dom";
import LaunchIcon from '@mui/icons-material/Launch';

const Eventpanel = ({ value, index, day, show, handle }) => {
  return (
    <div key={index} className={`event-data ${show && "expand"}`}>
      <div className="data-body">
        <div className="img">
          <img src="/assets/imgs/Schedule/images.png" alt="event-icon" />
        </div>
        {show && (
            <div className="desc">{value?.desc}
            {/* <Link to={`/events/` + value?.slug}>
              <Button variant={"filled"} innerText={"Learn more"}></Button>
              </Link> */}
            </div>
        )}
      </div>
      <div onClick={() => handle(index)} className="data-header">
        <div>{value?.eventName}{" "}
          { show &&
            <LaunchIcon />
          }
        </div>
        <p>12:00PM</p>
      </div>

    </div>
  );
};

const Eventcard = ({ Eventdata, Eventday }) => {
  const [expand, setexpand] = useState(0);
  const navigate = useNavigate();
  const handleExpand = (idx) => {
    if (idx === expand) {
      navigate(`/events/` + Eventdata[idx]?.url);
    }
    setexpand(idx);
  };
  console.log("Mee");
  return (
    <div className="event-card-container">
      <div className="section-event">
        <div className="event-card">
          {Eventdata.map((value, index) => (
            <Eventpanel
              key={index}
              value={value}
              day={Eventday}
              index={index}
              show={expand === index}
              handle={handleExpand}
            />
          ))}
        </div>
      </div>
      {/* Prev / Next Navigation */}
      <div className="timeline__nav">
        <button className="timeline__nav-btn">
          <span className="timeline__nav-icon">
            <img src="/assets/icons/arrow-left.svg" alt="" />
          </span>
          prev
        </button>
        <button className="timeline__nav-btn">
          next
          <span className="timeline__nav-icon">
            <img src="/assets/icons/arrow-right.svg" alt="" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Eventcard;
