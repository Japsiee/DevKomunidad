import { useEffect, useState } from "react";

const LeftHomepage = ({ id, cn, followers, following, contrib }) => {
  const [codename, setCodename] = useState(null);
  useEffect(() => {
    setCodename(cn);
  }, [cn])

  let fllwrs;
  let fllwng;

  if (! followers) {
    fllwrs = 0;
  } else {
    fllwrs = followers.split(",").length;
  }

  if (! following) {
    fllwng = 0;
  } else {
    fllwng = following.split(",").length;
  }

  return (
    <div className="LeftHomepage">
      <div className="profile bg-light py-3 px-5 rounded">
        <p className="lead fw-bold text-secondary text-capitalize">
          { ! codename ? "" : codename + " #" + id.slice(11).toLowerCase() }
        </p>
        

      {
        ! fllwrs && ! fllwng ?  
        <p className="d-flex justify-content-around align-items-center text-secondary">
          <span className="fw-bold fs-5">0</span>
          <span className="fw-bold fs-5">0</span>
        </p>
        :
        <p className="d-flex justify-content-around align-items-center text-secondary">
          <span className="fw-bold fs-5">{ fllwrs }</span>
          <span className="fw-bold fs-5">{ fllwng }</span>
        </p>
      }
        
        <p className="d-flex justify-content-between align-items-center">
          <a href="/a/you" className="fw-bold fs-5 text-decoration-none">Followers</a>
          <a href="/a/you" className="fw-bold fs-5 text-decoration-none">Following</a>
        </p>
        <p className="d-flex justify-content-around align-items-center text-secondary">
          <span className="fw-bold fs-5">{ contrib ? contrib: "" }</span>
        </p>
        <p className="d-flex justify-content-center align-items-center">
          <span className="fw-bold fs-5 text-info">Contribution</span>
        </p>
      </div>

      <hr />

      <div className="profile bg-light my-3 py-3 px-5 rounded">
        <p className="lead fw-bold text-secondary"></p>
      </div>
    </div>
  );
}
 
export default LeftHomepage;