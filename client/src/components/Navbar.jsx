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
    top: "50px",
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
      <div className="flex justify-between items-center bg-purple-500 py-3 px-3 md:px-5">
        <div>
          <a href="/a" className="text-xl md:text-3xl font-bold text-white transition duration-200 ease-in hover:text-purple-700">DevKom</a>
        </div>
        <div className="flex justify-between items-center bg-purple-600 text-white relative px-3 py-2 rounded shadow-xl" style={{ width: "150px" }}>
          <p className="font-semibold uppercase">{ ! codename ? "" : codename }</p>
          <button className="border-2 rounded-full py-1 px-2 hover:bg-purple-400" onClick={ handleToggle }>
            { isToggle ?
              <i className="bi bi-caret-up-fill"></i>
            :  
              <i className="bi bi-caret-down-fill"></i>
            }
          </button>

          <div className="absolute flex flex-col" style={ isToggle ? settingStyleOn : settingStyleOff }>
            <a href="/a/you" className="bg-gray-400 text-white py-2 px-3 rounded mb-1 transition duration-200 ease-in hover:bg-purple-400 shadow-md">Profile</a>
            <button type="button" className="text-left bg-gray-400 text-white py-2 px-3 rounded transition duration-200 ease-in hover:bg-purple-400 shadow-md" onClick={ handleLogout } >Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Navbar;