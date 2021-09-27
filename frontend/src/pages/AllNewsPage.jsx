import React, { useEffect } from 'react';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNews } from '../redux/actions/NewsActions';
import NewsList from '../components/news/NewsList';

const AllNewsPage = () => {
  const dispatch = useDispatch();
  // const fetchNews = async () => {
  //   await axios
  //     .get('http://localhost:3000/news')
  //     .then((response) => dispatch(setNews(response.data)))
  //     .catch((err) => {
  //       console.error('Err: ', err);
  //     });
  // };

  useEffect(() => {
    dispatch(setNews());
  }, []);

  return (
    <div>
      <NewsList />
    </div>
  );
};

export default AllNewsPage;
