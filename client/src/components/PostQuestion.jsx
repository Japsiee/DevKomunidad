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
        <div className="PostEach bg-purple-100 text-gray-600 py-2 px-3 m-3 rounded shadow-sm relative" key={ dat._id }>
          {
            dat.from === localStorage.getItem('username') ?
            <button type="button" className="font-semibold text-purple-500 text-xl my-3"><i className="bi bi-gear-fill text-primary"></i></button>
            :
            ""
          }
          <p className="text-xl font-semibold text-gray-700">{ dat.title }</p>
          <p className="text-lg">Asked by: <a href="/" className="text-purple-700 hover:text-purple-500">{ dat.from }</a></p>
          <span className="absolute top-2 right-5 font-semibold text-purple-500">{ dat.tag }</span>

          <p className="absolute top-7 right-5 font-semibold text-purple-500">
            { dat.createdAt[5] + dat.createdAt[6] + "/" + dat.createdAt[8] + dat.createdAt[9] + "/" +dat.createdAt[0] + dat.createdAt[1] + dat.createdAt[2] + dat.createdAt[3] }
          </p>

          { 
            getQuestion(dat.question) ? 
              <p className="text-base text-gray-500 my-4">{ dat.question.slice(0,250) }<button type="button" className="font-bold" onClick={ e => setUnfold(e, dat.question) } >&nbsp; . . . </button></p>
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