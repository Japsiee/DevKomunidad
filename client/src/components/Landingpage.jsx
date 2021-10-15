import React from 'react';

const Landingpage = ({ leftpage, rightpage }) => {
  return(
    <div className="LandingPage">
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div>
          { leftpage }
        </div>
        <div>
          { rightpage }
        </div>
      </div>
    </div>
  )
}

export default Landingpage;