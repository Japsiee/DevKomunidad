import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const fetchLogin = async reqBody => {
  const result = await fetch('/api/users/login', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: reqBody
  });
  const data = await result.json();
  return data;
}

const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const history = useHistory();

  const getUsername = e => {
    setUsername(e.target.value);
  }

  const getPassword = e => {
    setPassword(e.target.value);
  }

  const handleLogin = async e => {
    e.preventDefault();
    setErr(false);

    const obj = {
      username: username,
      password: password
    }

    const result = await fetchLogin(JSON.stringify(obj));
    if (result.authenticated) {
      history.push({
        pathname: '/a',
        data: result.data
      });
    } else {
      setErr(true);
    }
  }

  return (
    <div className="Loginpage">
      <h1 className=" mb-3"><i className="bi bi-key-fill"></i> Enter existing account</h1>
      <form onSubmit={ handleLogin } className="p-3 rounded" style={{ backgroundColor: "#F3F4ED" }}>
        <input type="text" placeholder="Username" className="form-control mb-3 fs-5" value={username} onChange={ getUsername } autoComplete="false" />
        <input type="password" placeholder="Password" className="form-control mb-3 fs-5" value={password} onChange={ getPassword } autoComplete="false" />
        <button type="submit" className="btn btn-dark btn-lg">Login <i className="bi bi-arrow-right"></i></button>
      </form>

      <div className="d-flex flex-column justify-content-center align-items-center">
        { err ? 
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img src="sad.svg" alt="sorry" className="img-fluid mt-5 pt-5" style={{ width: "200px" }} />
            <h1 className="display-4 fw-bold text-center text-danger mt-5">Sorry, Login Failed</h1>
          </div>
        : 

        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src="login.svg" alt="welcome" className="img-fluid mt-5 pt-5" style={{ width: "200px" }} />
          <h1 className="display-4 fw-bold text-center text-primary mt-5">Hello there !</h1>
        </div>

        }
      </div>

    </div>
  );
}
 
export default Loginpage;