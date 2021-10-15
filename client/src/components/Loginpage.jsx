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
    <div className="Loginpage p-6 md:p-12 p-md-5">
      <h1 className="mb-3 text-lg sm:text-2xl lg:text-4xl text-purple-700 font-bold"><i className="bi bi-key-fill"></i> Enter existing account</h1>
      <form onSubmit={ handleLogin } className="p-3 text-lg">
        <div className="flex flex-col">
          <input type="text" placeholder="Username" className="outline-none border-b-2 border-purple-200 py-2" value={username} onChange={ getUsername } autoComplete="false" />
          <input type="password" placeholder="Password" className="outline-none border-b-2 border-purple-200 py-2" value={password} onChange={ getPassword } autoComplete="false" />
          <div>
            <button type="submit" className="text-left bg-purple-500 py-2 px-3 pr-8 mt-2 text-purple-50 font-bold rounded transition duration-200 ease-in hover:bg-purple-400 ">Login <i className="bi bi-arrow-right"></i></button>
          </div>
        </div>
      </form>

      <div className="">
        { err ? 
          <div className="flex flex-col justify-center items-center overflow-hidden relative max-h-96 mt-12">
            <h1 className="text-2xl text-red-500 font-bold absolute top-10 right-10">Sorry, Login Failed</h1>
            <img src="sad.svg" alt="sorry" className="my-4 p-5" />
          </div>
        : 
        <div className="flex flex-col justify-center items-center overflow-hidden relative max-h-96 mt-12">
          <h1 className="text-2xl text-purple-700 font-bold absolute bottom-10 left-10">Hello there !</h1>
          <img src="login.svg" alt="welcome" className="my-4 p-5" />
        </div>

        }
      </div>

    </div>
  );
}
 
export default Loginpage;