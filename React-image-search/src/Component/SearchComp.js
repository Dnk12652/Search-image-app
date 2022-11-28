import React, { useState } from 'react'
import axios from "axios"
import "./style.css"


function SearchComp() {
  const [searchQuery, setsearchQuery] = useState("")
  const [Images, setImages] = useState([])
  const [Bookmarklist, setbookmarklist] = useState([])
  const fetchRequest = async (e) => {
    e.preventDefault()
    console.log(searchQuery)
    const Access_key = "J2MgKJVSamO0Rw_PxKlbJnbaBdWRIYmIMUjFxjmQLO8"
    const response = await axios.get(`https://api.unsplash.com/search/photos?client_id=${Access_key}`, {
      params: { query: searchQuery },
    });

    console.log(response);
    setImages(response?.data?.results);
  };
  const Addbookmarkimage = (val) => {
    let arr = [...Bookmarklist, val]
    setbookmarklist(arr)
  }

  return (
    <div>
      <div className="container">
        <h1 className="title">React Photo Search</h1>
        <button className='button btn1'
          style={Bookmarklist?.length > 0 ? { backgroundColor: "rgba(0, 0, 0, 0.75)", border: "1px solid rgba(0, 0, 0, 0.75)" } : { backgroundColor: "rgba(124, 121, 121, 0.85)" }}
          onClick={() => setImages(Bookmarklist)}
        >Bookmarks</button>
      </div>
      <form className="form">
        <input
          type="text"
          name="query"
          className="input"
          value={searchQuery}
          onChange={(e) => setsearchQuery(e.target.value)}
          placeholder={"search free high resolution images"}
        />
        <button style={{ backgroundColor: "rgba(0, 0, 0, 0.75)", border: "1px solid rgba(0, 0, 0, 0.75)" }} onClick={fetchRequest} className="button btn2" >
          Search
        </button>
      </form>
      <div className="card-list">
        {Images?.map((pic) =>
          <div className="card" key={pic.id}>
            <img
              className="image"
              alt={pic.alt_description}
              src={pic.urls.full}
              width="100px"
              height="200px"
              onClick={() => Addbookmarkimage(pic)}
            ></img>
          </div>)};
      </div>
    </div>
  )
}

export default SearchComp
