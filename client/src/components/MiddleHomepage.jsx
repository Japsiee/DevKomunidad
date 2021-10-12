import React, { useState, useEffect } from 'react';
import PostQuestionForm from './PostQuestionForm';
import PostQuestion from './PostQuestion';
import PostLoading from './PostLoading';

// fetch the data to pass to PostQuestion Component

const MiddleHomepage = ({ username }) => {
  const [data, setData] = useState(null);
  const [cb, setCB] = useState(null);

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        const result = await fetch('/api/questions', {
          signal: controller.signal
        });
        const data = await result.json();
        setData(data.data);
        controller = null;
      } catch(e) {
        console.log("Aborted in the Homepage");
      }
    })()
    return () => controller?.abort();
  }, [cb])

  const handler = result => {
    result ? setCB(false) : setCB(true);
  }

  return(
    <div className="MiddleHomepage">
      <PostQuestionForm callback={handler} username={ username } />
      {
        ! data ?
          <PostLoading />
        :
          <PostQuestion data={data} />
      }
      
    </div>
  )
}

export default MiddleHomepage;