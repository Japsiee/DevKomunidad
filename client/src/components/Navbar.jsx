import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = ({ codename }) => {
  const history = useHistory();
  const [isToggle, setToggle] = useState(false);

  const handleLogout = async () => {
    const result = await fetch('/api/logout');
    const data = await result.json();
    
    if (data.logout) {
      localStorage.removeItem('_id');
      localStorage.removeItem('codename');
      localStorage.removeItem('email');
      localStorage.removeItem('bio');
      localStorage.removeItem('username');
      localStorage.removeItem('followers');
      localStorage.removeItem('following');
      localStorage.removeItem('contrib');
      history.push('/');
    }
  }

  const handleToggle = () => {
    isToggle ? setToggle(false) : setToggle(true);
  }

  const settingStyleOn = {
    width: "150px",
    top: "40px",
    right: 0,
    opacity: 1,
    visibility: "visible",
    transitionDuration: ".2s"
  }

  const settingStyleOff = {
    width: "150px",
    top: "0px",
    right: 0,
    opacity: 0,
    visibility: "hidden",
    transitionDuration: ".2s"
  }

  return (
    <div className="Navbar mb-3">
      <div className="jumbotron d-flex justify-content-between align-items-center bg-dark text-white px-3 py-3 position-relative">
        <div>
          <a href="/a" className="display-5 fw-bold text-decoration-none text-white">DevKom</a>
        </div>
        <div className="rounded px-3 py-2 bg-white text-dark d-flex justify-content-between align-items-center position-relative" style={{ width: "150px" }}>
          <p className="lead m-0 fw-bold text-capitalize">{ ! codename ? "" : codename }</p>
          <button className="btn btn-white rounded p-1" onClick={ handleToggle }><i className="bi bi-caret-down-fill"></i></button>

          <div className="position-absolute rounded bg-light text-dark px-3 py-2" style={ isToggle ? settingStyleOn : settingStyleOff }>
            <a href="/a/you" className="btn border-0 fw-bold text-decoration-none text-start d-block my-2">Profile</a>
            <button type="button" className="btn border-0 fw-bold my-2" onClick={ handleLogout } >Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Navbar;