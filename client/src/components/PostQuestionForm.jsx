import React, { useState } from 'react';

const PostQuestionForm = ({ callback, username }) => {
  const [type, setType] = useState(true);
  const [titleLength, setTitleLength] = useState(0);
  const [questionLength, setQuestionLength] = useState(0);
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [tag, setTag] = useState("");
  const [isPosted, setIsPosted] = useState(true);

  const getHandleType = () => {
    type ? setType(false) : setType(true);
  }

  const getTitleLength = e => {
    setTitleLength(e.target.value.length);
    setTitle(e.target.value);
  }

  const getQuestionLength = e => {
    setQuestionLength(e.target.value.length);
    setQuestion(e.target.value);
  }

  const getSelectTag = e => {
    setTag(e.target.value);
  }

  const postQuestion = e => {
    e.preventDefault();
    setIsPosted(false);

    const reqBody = {
      title: title,
      question: question,
      from: username,
      tag: tag
    }

    fetch('/api/questions', {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" }
    })

    .then(data => {
      setIsPosted(true);
      setTitle("");
      setTag("");
      setQuestion("");
      e.target.reset();
      callback(true);
    })
    .catch(err => {
      console.log(err);
      setIsPosted(true);
    })
    
  }

  return(
    <div className="PostQuestionForm">
      <form name="postQuestion" onSubmit={ postQuestion } className="p-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <input id="title" className="border-0 border-bottom border-2 fs-4 fw-normal" type="text" placeholder="Question Title" aria-label="Question" maxLength="125" onChange={ getTitleLength } />
            <span className="d-flex justify-content-center align-items-center p-3 fw-bold text-secondary">{ titleLength } / 125</span>
          </div>
          <div className="d-flex">
            <button type="button" className="btn btn-secondary mx-2" onClick={ getHandleType } >{ type ? "Text" : "Code" }</button>
            <select className="form-select" id="tag" onChange={ getSelectTag } >
              <option value="">Tag</option>
              <option value="Javascript">Javascript</option>
              <option value="React JS">React JS</option>
              <option value="Node JS">Node JS</option>
            </select>
          </div>
        </div>
        <div className="question">
          <div className="my-3">
            <pre className="position-relative">
              { isPosted ? 
                <button type="submit" className="btn btn-secondary position-absolute btn-lg" style={{ bottom: "20px", right: "20px" }}>Post</button>
                :
                <button type="submit" className="btn btn-secondary position-absolute btn-lg" style={{ bottom: "20px", right: "20px" }} disabled >Posting ...</button>
              }
              <span className="position-absolute fw-bold fs-5 text-secondary px-3 py-2 bg-white" style={{ bottom: "20px", left: "20px" }}>{ questionLength } / 500</span>
              <textarea id="question" className="form-control" onChange={ getQuestionLength } maxLength="500" placeholder="Share your thoughts ..." style={{ minHeight: "200px", fontFamily: "arial" }}></textarea>
            </pre>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PostQuestionForm;