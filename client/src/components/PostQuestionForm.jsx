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
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center">
            <input id="title" className="text-xl outline-none shadow-sm py-2 px-3 bg-purple-50 text-gray-600" type="text" placeholder="Question Title" maxLength="125" onChange={ getTitleLength } autoCorrect="false" />
            <span className="flex text-gray-500 ml-6">{ titleLength } / 125</span>
          </div>
          <div className="flex my-3 md:my-0">
            <button type="button" className="bg-gray-500 text-white p-3 rounded shadow-sm" onClick={ getHandleType } >{ type ? "Text" : "Code" }</button>
            <select className="bg-gray-500 text-white p-3 rounded shadow-sm ml-2 cursor-pointer outline-none" id="tag" onChange={ getSelectTag } >
              <option value="">Tag</option>
              <option value="Basic">Basic</option>
              <option value="C">C</option>
              <option value="C++">C++</option>
              <option value="C#">C#</option>
              <option value="CSS">CSS</option>
              <option value="HTML / XML">HTML / XML</option>
              <option value="Javascript">Javascript</option>
              <option value="Java">Java</option>
              <option value="Perl">Perl</option>
              <option value="PHP">PHP</option>
              <option value="Python">Python</option>
              <option value="Ruby">Ruby</option>
              <option value="VBasic">VBasic</option>
            </select>
          </div>
        </div>
        <div className="question">
          <div className="my-3 flex flex-col relative">
            { isPosted ? 
              <button type="submit" className="absolute bottom-0 right-0 text-xl py-2 px-4 bg-purple-500 rounded text-white hover:bg-purple-400">Post</button>
              :
              <button type="submit" className="" disabled >Posting ...</button>
            }
            <span className="absolute bottom-2 left-2 bg-purple-400 px-3 py-2 text-white rounded">{ questionLength } / 500</span>
            <div className="flex">
              <textarea id="question" className="outline-none bg-gray-100 shadow-sm rounded py-2 px-3 w-full text-gray-600 overflow-hidden" onChange={ getQuestionLength } maxLength="500" placeholder="Share your thoughts ..." style={{ minHeight: "200px", fontFamily: "arial" }} autoCorrect="false" ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PostQuestionForm;