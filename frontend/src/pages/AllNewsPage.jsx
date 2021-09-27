import React, { useEffect } from 'react';
import { Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setNews } from '../redux/actions/NewsActions';
import NewsList from '../components/news/NewsList';

const AllNewsPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.allNews.error);
  useEffect(() => {
    dispatch(setNews());
  }, [dispatch]);

  return (
    <div>
      {error && <Alert message={error} type="error" />}
      <NewsList />
    </div>
  );
};

export default AllNewsPage;
