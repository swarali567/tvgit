import React, { useState } from 'react';
import axios from 'axios';

const ShowDetails = ({ show }) => (
  <div>
    <h1>{show.name}</h1>
    <p>{show.summary}</p>
  </div>
);

const App = () => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const handleShowSelect = async (id) => {
    const response = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    setSelectedShow(response.data);
  };

  const fetchShows = async () => {
    const response = await axios.get('http://api.tvmaze.com/shows');
    setShows(response.data);
  };

  return (
    <div>
      <button onClick={fetchShows}>Fetch Shows</button>
      <ul>
        {shows.map((show) => (
          <li key={show.id} onClick={() => handleShowSelect(show.id)}>
            {show.name}
          </li>
        ))}
      </ul>
      {selectedShow && <ShowDetails show={selectedShow} />}
    </div>
  );
};

export default App;  

/* import React, { useState } from 'react';
import axios from 'axios';


const Card = ({ show, handleShowSelect }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <div className="px-6 py-4">
      <h1 className="font-bold text-xl mb-2">{show.name}</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleShowSelect(show.id)}
      >
        Show Details
      </button>
    </div>
  </div>
);

const ShowDetails = ({ show }) => (
  <Card>
    <h1 className="font-bold text-xl mb-2">{show.name}</h1>
    <p className="text-gray-700 text-base">{show.summary}</p>
  </Card>
);

const App = () => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const handleShowSelect = async (id) => {
    const response = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    setSelectedShow(response.data);
  };

  const fetchShows = async () => {
    const response = await axios.get('http://api.tvmaze.com/shows');
    setShows(response.data);
  };

  return (
    <div className="container mx-auto">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchShows}>
        Fetch Shows
      </button>
      <ul className="mt-4">
        {shows.map((show) => (
          <li key={show.id} className="cursor-pointer">
            <Card show={show} handleShowSelect={handleShowSelect} />
          </li>
        ))}
      </ul>
      {selectedShow && <ShowDetails show={selectedShow} />}
    </div>
  );
};

export default App; */