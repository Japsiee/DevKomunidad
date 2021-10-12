import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const passwordValidation = (password, confirmPassword) => {
  if (password.length <= 4 || confirmPassword.length <= 4) {
    return false;
  } else {
    return password === confirmPassword ? true : false;
  }
}

const usernameValidation = username => {
  if (!username.startsWith("@")) {
    return false;
  } else {
    return username.length >= 5 ? true : false;
  }
}

const fetchSignup = async reqBody => {
  const result = await fetch('/api/users/create-account', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: reqBody
  });

  const data = await result.json();
  return data;
}

const Signuppage = () => {

  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notify, setNotify] = useState(false);
  const [err, setErr] = useState(null);

  const getUsername = e => {
    setUsername(e.target.value);
  }

  const getPassword = e => {
    setPassword(e.target.value);
  }

  const getConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  }

  const handleSignup = async e => {
    e.preventDefault();
    setErr(null);
    setNotify(false);

    const obj = {
      username: username,
      password: password
    }

    const resultPW = await passwordValidation(password, confirmPassword);
    const resultUN = await usernameValidation(username);

    if (resultUN) {
      if (resultPW) {
        const data = await fetchSignup(JSON.stringify(obj));
        if (data.created) {
          e.target.reset();
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setNotify(true);
          setTimeout(() => {
            history.push({
              pathname: "/a",
              data: data.data
            });
          }, 1500)
        } else {
          setErr({ message: "Internal server error, please try again in a minute" });
        }
      } else {
        setErr({ message: "Passwords might doesn't match or password is too short" });
      }
    } else {
      setErr({ message: "Username must atleast have 5 characters and should starts with \"@\"" })
    }
  
  }

  return (
    <div className="Signuppage">
      <h1><i className="bi bi-person-plus-fill"></i> Create Account</h1>
      <form onSubmit={ handleSignup } className="p-3 rounded" style={{ backgroundColor: "#F3F4ED" }}>
        <input type="text" placeholder="Username" className="form-control mb-3 fs-5" value={username} onChange={ getUsername } autoComplete="false" />
        <input type="password" placeholder="Password" className="form-control mb-3 fs-5" value={password} onChange={ getPassword } autoComplete="false" />
        <input type="password" placeholder="Confirm Password" className="form-control mb-3 fs-5" value={confirmPassword} onChange={ getConfirmPassword } autoComplete="false" />
        <button type="submit" className="btn btn-dark btn-lg">Create Account <i className="bi bi-arrow-right"></i></button>
      </form>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src="create.svg" alt="create" className="img-fluid mt-5 pt-5" style={{ width: "250px" }} />
        <p className="lead fw-bold text-center text-danger mt-5">{ err ? err.message : "" }</p>
        <h1 className="display-5 text-success text-center mt-3 fw-bold pt-3">{ notify ? "User Created !" : "" }</h1>
      </div>
      

    </div>
  );
}
 
export default Signuppage;