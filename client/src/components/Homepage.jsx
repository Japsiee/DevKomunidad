import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LeftHomepage from './LeftHomepage';
import MiddleHomepage from './MiddleHomepage';
import Navbar from './Navbar';

const Homepage = (props) => {
  const history = useHistory();
  const [session, setSession] = useState(false);

  const fetchLogin = async reqBody => {
    const result = await fetch('/api/users/checklogin', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: reqBody
    });
    const data = await result.json();
    return data;
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
            (async () => {
              const obj = {
                id: localStorage.getItem('_id'),
                username: localStorage.getItem('username')
              }
              const data = await fetchLogin(JSON.stringify(obj));

              if (data.verified) {
                const { _id, codename, email, bio, username, followers, following, contrib } = data.userData;
                localStorage.setItem('_id', _id);
                localStorage.setItem('codename', codename);
                localStorage.setItem('email', email);
                localStorage.setItem('bio', bio);
                localStorage.setItem('username', username);
                localStorage.setItem('followers', followers);
                localStorage.setItem('following', following);
                localStorage.setItem('contrib', contrib);
              } else {
                (async () => {
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
                })();
              }
            })();
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
      <Navbar codename={ localStorage.getItem('codename') } />
      <div className="grid grid-rows-1 grid-flow-col gap-3">
        <div className="col-span-1 hidden md:flex">
          <LeftHomepage
            id={localStorage.getItem('_id')}
            cn={localStorage.getItem('codename')}
            bio={localStorage.getItem('bio')}
            followers={localStorage.getItem('followers')}
            following={localStorage.getItem('following')}
            contrib={localStorage.getItem('contrib')}
          />
        </div>
        <div className="col-auto">
          <MiddleHomepage username={ localStorage.getItem('username') } />
        </div>
        <div className="col-span-3">
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default Homepage;