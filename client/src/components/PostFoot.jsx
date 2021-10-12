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
    <div className="PostFoot">
      <form onSubmit={ handleInteractions } className="d-flex justify-content-between align-items-center">
        {
          loading || sessionStorage.getItem('username') === dat.from ?
          <button type="submit" className="btn btn-primary px-3 py-2" disabled><i className="bi bi-capslock-fill"></i> { ups }</button>
          :
          <button type="submit" className="btn btn-primary px-3 py-2"><i className="bi bi-capslock-fill"></i> { ups }</button>
        }
        <a href="/" className="text-decoration-none text-primary fs-6 fw-bold text-uppercase">View in details&nbsp;&nbsp;<i className="bi bi-layers-fill fs-5"></i></a>
        <span className="bg-transparent rounded px-3 py-2"><i className="bi bi-chat-square-text-fill"></i> { dat.comments.length }</span>
      </form>
    </div>
  )
}

export default PostFoot;