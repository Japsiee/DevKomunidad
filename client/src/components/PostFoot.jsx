import { useState } from 'react';

const PostFoot = ({ dat }) => {
  const [ups, setUps] = useState(dat.ups.length);
  const [loading, setLoading] = useState(false);

  const handleInteractions = e => {  
    setLoading(true);
    e.preventDefault();

    const upBy = sessionStorage.getItem('username');
    const toQuestion = dat._id;

    const reqObj = {
      upBy: upBy,
      toQuestion: toQuestion
    } 

    fetch('/api/questions', {
      method: "PUT",
      body: JSON.stringify(reqObj),
      headers: { "Content-Type": "application/json" }
    })
    .then(response => { return response.json() })
    .then(result => {
      setLoading(false);
      if (result.up === "added") {
        setUps(ups + 1);
      } else {
        setUps(ups - 1);
      }
    })
    .catch(err => {
      setLoading(false);
      console.log(err);
    })

  }

  return(
    <div className="PostFoot bg-purple-500 text-white text-xl">
      <form onSubmit={ handleInteractions } className="flex justify-center items-center">
        {
          loading || localStorage.getItem('username') === dat.from ?
          <button type="submit" className="text-gray-100" disabled><i className="bi bi-capslock-fill"></i> { ups }</button>
          :
          <button type="submit" className="hover:text-purple-300"><i className="bi bi-capslock-fill"></i> { ups }</button>
        }
        <a href="/" className="mx-5 hover:text-purple-300">View in details</a>
        <span className="bg-transparent rounded px-3 py-2"><i className="bi bi-chat-square-text-fill"></i> { dat.comments.length }</span>
      </form>
    </div>
  )
}

export default PostFoot;