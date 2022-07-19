import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import ShowTile from '../components/ShowTile';

import { setList } from '../store/listSlice';

import style from './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);

  const [query, setQuery] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const updateList = useCallback((data) => dispatch(setList(data)), [dispatch]);

  // call movies based on your location
  const fetchCountryMovies = useCallback(async () => {
    if (countryCode !== '') {
      const api = await fetch(
        `https://api.tvmaze.com/schedule?country=${countryCode}`
      );
      const data = await api.json();
      updateList(data);
    }
  }, [countryCode, updateList]);

  const fetchData = useCallback(
    async (q) => {
      const api = await fetch(`https://api.tvmaze.com/search/shows?q=${q}`);
      const data = await api.json();

      updateList(data);
    },
    [updateList]
  );

  const fetchUserLocation = async () => {
    const api = await fetch(
      `https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
    );
    const data = await api.json();
    setCountryCode(data?.country?.iso_code || 'PH');
  };

  const handleSearch = useCallback(
    (e) => {
      setQuery(e.target.value);

      clearTimeout(searchTimeout);

      if (e.target.value === '') {
        setSearchTimeout(
          setTimeout(() => {
            fetchCountryMovies();
          }, 750)
        );
      } else {
        setSearchTimeout(
          setTimeout(() => {
            fetchData(e.target.value);
          }, 750)
        );
      }
    },
    [fetchCountryMovies, fetchData, searchTimeout]
  );

  useEffect(() => {
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (countryCode !== '') {
      fetchCountryMovies();
    }
  }, [countryCode, fetchCountryMovies]);

  return (
    <div className='container'>
      <input
        type='text'
        onChange={handleSearch}
        className='search-bar'
        placeholder='Search here'
        value={query}
      />
      <motion.div layout className='list'>
        <AnimatePresence>
          {list.map((show) => (
            <ShowTile key={show.show.id} {...show} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Home;
