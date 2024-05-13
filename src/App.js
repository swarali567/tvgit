import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://api.tvmaze.com/schedule', {
          params: {
            country: 'US',
            date: '2022-01-01',
          },
        });
        setShows(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  const handleShowSelect = (show) => {
    setSelectedShow(show);
  };

  const showList = useMemo(() => {
    return shows.map((show) => (
      <li key={show.id} onClick={() => handleShowSelect(show)}>
        {show.name}
      </li>
    ));
  }, [shows]);

  return (
    <div>
      <h1>TV Schedule</h1>
      {loading? (
        <p>Loading...</p>
      ) : (
        <ul>{showList}</ul>
      )}
      {error && <p>Error: {error}</p>}
      {selectedShow && (
        <div>
          <h2>{selectedShow.name}</h2>
          <p>{selectedShow.summary}</p>
        </div>
      )}
    </div>
  );
}

export default App; 