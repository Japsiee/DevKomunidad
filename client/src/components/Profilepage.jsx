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
  const [username, setUsername] = useState(null);
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
            const { _id, username, followers, following, contrib } = props.location.data;
            localStorage.setItem('_id', _id);
            localStorage.setItem('username', username);
            localStorage.setItem('followers', followers);
            localStorage.setItem('following', following);
            localStorage.setItem('contrib', contrib);
            setSession(true);
          } else {
            setId(localStorage.getItem('_id'));
            setUsername(localStorage.getItem('username'));
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
      <Navbar username={ localStorage.getItem('username') } />
      <div className="row m-0">
        <div className="LeftProfilepage col-12 col-md-6">
          <div className="p-3 p-md-5 m-0">
            <h1 className="display-3 fw-bold text-capitalize text-primary">
              { ! username ? "" : username.slice(1) }
            </h1>
            <p className="lead text-secondary fw-bold">#
              { ! id ? "" : id.slice(11).toLowerCase() }
            </p>
            <br />
            <p className="lead text-light fw-bold bg-primary bg-gradient py-2 px-0 rounded d-flex justify-content-between">
              <span>Contribution Pts.</span>
              <span>+ { ! contrib ? "" : contrib }</span>
            </p>
            {/* Bio */}
            <p className="lead text-secondary fw-bold">Bio</p>
            <hr />
            <p className="lead text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam incidunt laudantium tempora temporibus animi officiis, ducimus cupiditate autem eveniet corrupti architecto voluptas. Saepe deserunt possimus ex incidunt rem beatae. Doloremque.</p>
            <hr />
            {/* Followers */}
            <div>
              <p className="lead text-secondary fw-bold d-flex justify-content-between align-items-center">
                <span>Followers&nbsp;&nbsp;<span className="badge bg-primary rounded">{! followers ? "" : followers.length }</span></span>
                {
                  expandFollowers ?
                  <button type="button" className="btn border-0 bg-transparent fs-3" onClick={ toggleFollowers }>
                    <i className="bi bi-door-open-fill"></i>
                  </button>
                  :
                  <button type="button" className="btn border-0 bg-transparent fs-3" onClick={ toggleFollowers }>
                    <i className="bi bi-door-closed"></i>
                  </button>
                }
              </p>
            </div>
            <hr />
            <div className="followers" style={ expandFollowers ? expand : contract }>
              { ! followers || followers === 0 ?
                <p className="display-6 text-muted fw-normal text-center">No Followers</p>
                : followers.map((fllwrs, index) => (
                <p className="lead text-primary fw-normal mb-0" key={index}>{ fllwrs }</p>
              )) }
            </div>
            <hr />
            {/* Following */}
            <p className="lead text-secondary fw-bold d-flex justify-content-between align-items-center">
              <span>Following&nbsp;&nbsp;<span className="badge bg-primary rounded">{ ! following ? "" : following.length }</span></span>
              {
                expandFollowing ?
                <button type="button" className="btn border-0 bg-transparent fs-3" onClick={ toggleFollowing }>
                  <i className="bi bi-door-open-fill"></i>
                </button>
                :
                <button type="button" className="btn border-0 bg-transparent fs-3" onClick={ toggleFollowing }>
                  <i className="bi bi-door-closed"></i>
                </button>
              }
            </p>
            <hr />
            <div className="following" style={ expandFollowing ? expand : contract }>
              { ! following || following === 0 ?
                <p className="display-6 text-muted fw-normal text-center">No Following</p>
                : following.map((fllwng, index) => (
                <p className="lead text-primary fw-normal mb-0" key={index}>{ fllwng }</p>
              )) }
            </div>
            <hr />
          </div>
        </div>
        <div className="RightProfilepage col-12 col-md-6">
          
        </div>
      </div>
    </div>
  )
}

export default Profilepage;