import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';

const contract = {
  maxHeight: "50px",
  overflow: "hidden"
}

const expand = {
  maxHeight: "",
  overflow: "hidden"
}

const Profilepage = (props) => {
  const history = useHistory();
  const [session, setSession] = useState(false);
  const [expandFollowers, setExpandFollowers] = useState(false);
  const [expandFollowing, setExpandFollowing] = useState(false);
  const [id, setId] = useState(null);
  const [codename, setCodename] = useState(null);
  const [bio, setBio] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);
  const [contrib, setContrib] = useState(null);

  const toggleFollowers = () => {
    expandFollowers ? setExpandFollowers(false) : setExpandFollowers(true);
  }

  const toggleFollowing = () => {
    expandFollowing ? setExpandFollowing(false) : setExpandFollowing(true);
  }

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        const result = await fetch('/api/auth', {
          signal: controller.signal
        });
        const data = await result.json();
        if (!data.authenticated) {
          history.push('/');
        } else {
          if (localStorage.length <= 0) {
            const { _id, codename, email, bio, username, followers, following, contrib } = props.location.data;
            localStorage.setItem('_id', _id);
            localStorage.setItem('codename', codename);
            localStorage.setItem('email', email);
            localStorage.setItem('bio', bio);
            localStorage.setItem('username', username);
            localStorage.setItem('followers', followers);
            localStorage.setItem('following', following);
            localStorage.setItem('contrib', contrib);
            setSession(true);
          } else {
            setId(localStorage.getItem('_id'));
            setCodename(localStorage.getItem('codename'));
            setBio(localStorage.getItem('bio'));
            if (localStorage.getItem('followers') === "") {
              setFollowers(0);
            } else {
              setFollowers(localStorage.getItem('followers').split(","));
            }
            if (localStorage.getItem('following') === "") {
              setFollowing(0);
            } else {
              setFollowing(localStorage.getItem('following').split(","));
            }
            setContrib(localStorage.getItem('contrib'));
          }
        }
        controller = null;
      } catch(e) {
        console.log("error", e);
      }
    })();
    return () => controller?.abort();
    // eslint-disable-next-line
  }, [session])

  return(
    
    <div className="Profilepage">
      <Navbar codename={ localStorage.getItem('codename') } />
      <div className="grid grid-cols-1 md:grid-cols-2 px-3">
        <div className="LeftProfilepage">
          <div className="bg-gray-50 rounded shadow-sm p-3">
            <h1 className="text-4xl font-semibold text-purple-500">
              { ! codename ? "" : codename }
            </h1>
            <p className="text-lg font-semibold text-purple-500">#
              { ! id ? "" : id.slice(11).toLowerCase() }
            </p>
            <br />
            {/* Bio */}
            <p className="text-lg font-bold text-gray-500 flex justify-between mb-2"><span>Bio</span><button type="button" className="text-purple-500 font-semibold hover:text-purple-400">Edit</button></p>
            <div className="bg-white shadow-sm p-3 mb-2">
              <p className="text-gray-500">{ 
                ! bio ? 
                <span className="block text-center text-xl font-bold text-gray-200">Bio unavailalbe</span> 
                : bio }
              </p>
            </div>

            <p className="text-lg font-bold text-gray-500 flex justify-between mb-2">
              <span>Contribution Pts.</span>
              <span>+ { ! contrib ? "" : contrib }</span>
            </p>
            {/* Followers */}
            <div>
              <p className="text-lg font-bold text-gray-500 flex justify-between mb-2">
                <span>Followers&nbsp;&nbsp;<span className="text-base px-1 py-0 bg-purple-500 text-white rounded">{! followers ? "0" : followers.length }</span></span>
                {
                  expandFollowers ?
                  <button type="button" className="text-purple-500 text-2xl" onClick={ toggleFollowers }>
                    <i className="bi bi-door-open-fill"></i>
                  </button>
                  :
                  <button type="button" className="text-purple-500 text-2xl" onClick={ toggleFollowers }>
                    <i className="bi bi-door-closed"></i>
                  </button>
                }
              </p>
            </div>
            <div className="followers" style={ expandFollowers ? expand : contract }>
              { ! followers || followers === 0 ?
                <p className="text-center font-semibold text-gray-300 text-lg">Followers unavailable</p>
                : followers.map((fllwrs, index) => (
                <p className="mb-2" key={index}>
                  <a href="/" className="text-base text-purple-500 text-decoration-none">{ fllwrs }</a>
                </p>
              )) }
            </div>
            {/* Following */}
            <p className="text-lg font-bold text-gray-500 flex justify-between mb-2">
              <span>Following&nbsp;&nbsp;<span className="text-base px-1 py-0 bg-purple-500 text-white rounded">{ ! following ? "0" : following.length }</span></span>
              {
                expandFollowing ?
                <button type="button" className="text-purple-500 text-2xl" onClick={ toggleFollowing }>
                  <i className="bi bi-door-open-fill"></i>
                </button>
                :
                <button type="button" className="text-purple-500 text-2xl" onClick={ toggleFollowing }>
                  <i className="bi bi-door-closed"></i>
                </button>
              }
            </p>
            <div className="following" style={ expandFollowing ? expand : contract }>
              { ! following || following === 0 ?
                <p className="text-center font-semibold text-gray-300 text-lg">Following unavailable</p>
                : following.map((fllwng, index) => (
                  <p className="mb-2" key={index}>
                  <a href="/" className="text-base text-purple-500 text-decoration-none">{ fllwng }</a>
                </p>
              )) }
            </div>
          </div>
        </div>
        <div className="RightProfilepage col-12 col-md-6">
          
        </div>
      </div>
    </div>
  )
}

export default Profilepage;