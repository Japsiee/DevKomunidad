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

  const [codename, setCodename] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notify, setNotify] = useState(false);
  const [err, setErr] = useState(null);

  const getCodename = e => {
    setCodename(e.target.value);
  }

  const getEmail = e => {
    setEmail(e.target.value);
  }

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
      codename: codename,
      email: email,
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
          setCodename("");
          setEmail("");
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
    <div className="Signuppage p-6 md:p-12 p-md-5">
      <h1 className="mb-3 text-lg sm:text-2xl lg:text-4xl text-purple-700 font-bold"><i className="bi bi-person-plus-fill"></i> Create Account</h1>
      <form onSubmit={ handleSignup } className="p-3 text-lg">
        <div className="flex flex-col">
          <input type="text" placeholder="Name" className="outline-none border-b-2 border-purple-200 py-2" value={codename} onChange={ getCodename } autoComplete="false" />
          <input type="text" placeholder="Email" className="outline-none border-b-2 border-purple-200 py-2" value={email} onChange={ getEmail } autoComplete="false" />
          <input type="text" placeholder="Username" className="outline-none border-b-2 border-purple-200 py-2" value={username} onChange={ getUsername } autoComplete="false" />
          <input type="password" placeholder="Password" className="outline-none border-b-2 border-purple-200 py-2" value={password} onChange={ getPassword } autoComplete="false" />
          <input type="password" placeholder="Confirm Password" className="outline-none border-b-2 border-purple-200 py-2" value={confirmPassword} onChange={ getConfirmPassword } autoComplete="false" />
          <div>
            <button type="submit" className="text-left bg-purple-500 py-2 px-3 pr-8 mt-2 text-purple-50 font-bold rounded transition duration-200 ease-in hover:bg-purple-400">Create Account <i className="bi bi-arrow-right"></i></button>
          </div>
        </div>
      </form>

      <div className="flex flex-col justify-center items-center overflow-hidden relative max-h-96 mt-12">
        {
          err ? 
            <p className="text-md bg-red-500 rounded p-2 text-red-50 font-bold mt-3 absolute left-10 bottom-10">{ err ? err.message : "" }</p>
          :
          ""
        }
        <p className="text-md text-green-700 font-bold mt-3 absolute left-10 bottom-10">{ notify ? "User Created !" : "" }</p>
        <img src="create.svg" alt="create" className="my-4 px-5" />   
      </div>
      

    </div>
  );
}
 
export default Signuppage;