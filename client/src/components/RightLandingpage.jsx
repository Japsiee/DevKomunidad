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
      <div className="input-group d-flex justify-content-center align-items-center">
      <span className="bg-transparent border-0 input-group-text me-3"><i className="bi bi-search fs-2"></i></span>
        <input type="text" placeholder="Question Title" className="w-50 border-0 border-bottom border-2 me-4 fs-4 p-2" maxLength="125" onChange={ getSearch } value={ search } />
        <select id="tag" className="input-group-text bg-transparent border-0 fw-bold fs-5" onChange={ getTag } value={ tag } >
          <option value="">No Tag</option>
          <option value="React JS">React JS</option>
          <option value="Node JS">Node JS</option>
          <option value="Javascript">Javascript</option>
        </select>
      </div>
    </form>

    <div className="pt-5" style={{ maxHeight: "500px", overflow: "auto" }}>
      {
        filter ?
          filter.map(dat => (
            <div className="container bg-dark bg-gradient text-white d-flex flex-column justify-content-center mb-3 py-4 rounded" key={ dat._id }>
              <h1 className="fs-4 fw-bold"><a href={`/question/${dat._id}`} className="text-decoration-none">{ wrappingTitle(dat.title) }</a></h1>
              <p className="lead">{ wrappingQuestion(dat.question) }</p>
            </div>
          ))
          
        :

        <div className="container d-flex flex-column justify-content-center align-items-center pt-5" style={{ overflow: "hidden" }}>
          <img src="search.svg" alt="search" img="img-fluid" style={{ maxWidth: "300px" }} />
          <h1 className="display-4 fw-bold text-center text-secondary pt-4">Search Results</h1>
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