import { useEffect, useState } from 'react';

const RightLandingpage = () => {

  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [filter, setFilter] = useState(null);

  const handleSearch = (e, search, tag) => {
    e.preventDefault();

    if (!search) {
      setFilter(null);
    } else {
      if (!tag) {
        const newData = data.filter(datum => {
          return (datum.title.toLowerCase().includes(search)) || (datum.question.toLowerCase().includes(search));
        })
        setFilter(newData);
        } else {
          const newData = data.filter(datum => {
            return (datum.title.toLowerCase().includes(search) || datum.question.toLowerCase().includes(search)) && (datum.tag === tag);
          })
          setFilter(newData);
        }
      }
    }

    

  const getSearch = e => {
    setSearch(e.target.value);
  }

  const getTag = e => {
    setTag(e.target.value);
  }

  useEffect(() => {
    fetchData()
    .then(data => {
      setData(data.data);
    })
    .catch(err => {
      console.log("Failed to fetch question", err);
    })
  }, [filter])

  return (
    <div className="RightLandingpage ">
    <form onSubmit={ e => handleSearch(e, search, tag) }>
      <div className="flex justify-center items-center pt-8 text-base md:text-lg lg:text-2xl">
      <span className=""><i className="bi bi-search fs-2 text-purple-500"></i></span>
        <input type="text" placeholder="Question Title" className="outline-none border-b-2 border-purple-500 mx-3 py-1" maxLength="125" onChange={ getSearch } value={ search } />
        <select id="tag" className="outline-none bg-purple-500 py-1 px-4 rounded text-purple-50 cursor-pointer" onChange={ getTag } value={ tag } >
          <option value="">No Tag</option>
          <option value="React JS">React JS</option>
          <option value="Node JS">Node JS</option>
          <option value="Javascript">Javascript</option>
        </select>
      </div>
    </form>

    <div className="p-6 md:p-12 p-md-5" style={{ maxHeight: "700px", overflow: "auto" }}>
      {
        filter ?
          filter.map(dat => (
            <div className="my-2 bg-purple-200 p-3 rounded" key={ dat._id }>
              <h1 className="text-xl text-purple-900 font-semibold transition duration-200 ease-in hover:text-purple-500"><a href={`/a/question/${dat._id}`} className="">{ wrappingTitle(dat.title) }</a></h1>
              <p className="text-base text-gray-600">{ wrappingQuestion(dat.question) }</p>
            </div>
          ))
          
        :

        <div className="flex flex-col justify-center items-center" style={{ overflow: "hidden" }}>
          <img src="search.svg" alt="search" img="img-fluid" style={{ maxWidth: "300px" }} />
          <h1 className="text-purple-700 text-base font-bold py-12 md:text-xl lg:text-3xl">Search Results</h1>
        </div>

      }
    </div>

  </div>
  );
}

const fetchData = async () => {
  const res = await fetch('/api/questions');
  const data = await res.json();
  return data;
}

const wrappingTitle = text => {
  return text.length >= 50 ? text.slice(0,50) + " ..." : text ;
}

const wrappingQuestion = text => {
  return text.length >= 150 ? text.slice(0,150) + " ..." : text ;
}
 
export default RightLandingpage;