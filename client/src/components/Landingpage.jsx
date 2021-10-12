import React from 'react';

const Landingpage = ({ leftpage, rightpage }) => {
  return(
    <div className="LandingPage">
      <div className="row m-0">
        <div className="col-12 col-md-6 p-0">
          { leftpage }
        </div>
        <div className="col-12 col-md-6 p-5">
          { rightpage }
        </div>
      </div>
    </div>
  )
}

export default Landingpage;