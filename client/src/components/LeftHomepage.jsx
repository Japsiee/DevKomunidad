import { useEffect, useState } from "react";

const LeftHomepage = ({ id, un, followers, following, contrib }) => {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    setUsername(un);
  }, [un])

  let fllwrs;
  let fllwng;

  if (! followers) {
    fllwrs = 0;
  } else {
    fllwrs = followers.split(",");
  }

  if (! following) {
    fllwng = 0;
  } else {
    fllwng = following.split(",");
  }

  return (
    <div className="LeftHomepage">
      <div className="profile bg-light py-3 px-5 rounded">
        <p className="lead fw-bold text-secondary text-capitalize">
          { ! username ? "" : username.slice(1) + " #" + id.slice(11).toLowerCase() }
        </p>
        

      {
        ! followers ?  
        <p className="d-flex justify-content-around align-items-center text-secondary">
          <span className="fw-bold fs-5">0</span>
          <span className="fw-bold fs-5">0</span>
        </p>

        :
        <p className="d-flex justify-content-around align-items-center text-secondary">
          <span className="fw-bold fs-5">{ fllwrs.length }</span>
          <span className="fw-bold fs-5">{ fllwng.length }</span>
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