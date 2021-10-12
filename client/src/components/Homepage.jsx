import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LeftHomepage from './LeftHomepage';
import MiddleHomepage from './MiddleHomepage';
import Navbar from './Navbar';

const Homepage = (props) => {
  const history = useHistory();
  const [session, setSession] = useState(false);
  
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
    
    <div className="Homepage">
      <Navbar username={ localStorage.getItem('username') } />
      <div className="row m-0 d-flex justify-content-center">
        <div className="col-3 col-md-4 col-lg-3 d-none d-md-flex d-lg-flex d-flex justify-content-center">
          <LeftHomepage
            id={localStorage.getItem('_id')}
            un={localStorage.getItem('username')}
            followers={localStorage.getItem('followers')}
            following={localStorage.getItem('following')}
            contrib={localStorage.getItem('contrib')}
          />
        </div>
        <div className="col-12 col-md-8 col-lg-6">
          <MiddleHomepage username={ localStorage.getItem('username') } />
        </div>
        <div className="col-3 d-none d-lg-flex">
          
        </div>
      </div>
    </div>
  )
}

export default Homepage;