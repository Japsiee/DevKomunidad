import React from 'react';
import PostFoot from './PostFoot';

const PostQuestion = ({ data }) => {

  const getQuestion = question => {
    return question.length >= 250 ? true : false;
  }

  const setUnfold = (e, question) => {
    e.target.parentElement.innerHTML = question;
  }

  return(
    <div className="PostQuestions">
    { 
      data.map(dat => (
        <div className="PostEach p-4 my-3 position-relative rounded" style={{ backgroundColor: "#F3F4ED", wordWrap: "break-word" }} key={ dat._id }>
          <p className="fs-3 fw-bold m-0 mt-4">{ dat.title }</p>
          <p className="text-secondary fs-6 m-0">Asked by: <a href="/" className="fw-bold text-primary text-decoration-none">{ dat.from }</a></p>
          <p className="lead fs-6 m-0 text-muted">
            { dat.createdAt[0] + dat.createdAt[1] + dat.createdAt[2] + dat.createdAt[3] + " " + dat.createdAt }
          </p>

          <hr />

          <span className="badge bg-dark text-light position-absolute fs-6" style={{ top: "10px", left: "10px" }}>{ dat.tag }</span>
          
          {
            dat.from === sessionStorage.getItem('username') ?
            <button type="button" className="btn border-0 bg-transparent position-absolute fs-4" style={{ top: "5px", right: "10px" }}><i className="bi bi-gear-fill text-primary"></i></button>
            :
            ""
          }

          { 
            getQuestion(dat.question) ? 
              <p className="lead text-dark mt-3 fw-normal fs-5">{ dat.question.slice(0,250) }<button type="button" className="border-0 bg-transparent text-primary fw-bold" onClick={ e => setUnfold(e, dat.question) } >&nbsp; . . . </button></p>
            :
              <p className="lead text-dark mt-3 fw-normal fs-5">{ dat.question }</p>
          }
          <PostFoot dat={ dat } />
        </div>
      ))
    }
    </div>
  )
}

export default PostQuestion;