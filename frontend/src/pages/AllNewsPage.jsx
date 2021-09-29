import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setNews } from '../redux/actions/NewsActions';
import NewsComponent from '../components/news/NewsComponent';
import './AllNewsPage.css';

const AllNewsPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.allNews.error);
  useEffect(() => {
    dispatch(setNews());
  }, [dispatch]);

  const news = useSelector((state) => state.allNews.news);
  const [searchParam, setSearchParam] = useState('');
  const [filterParam, setFilterParam] = useState('all');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (filterParam === 'all') {
      const result = news.filter((item) => item.title.toLowerCase().includes(searchParam)
      || item.author.toLowerCase().includes(searchParam)
      || item.tags.includes(searchParam));
      setSearchResult(result);
    } else {
      const result = news.filter((item) => item[filterParam].toLowerCase().includes(searchParam));
      setSearchResult(result);
    }
  }, [searchParam, news, filterParam]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchParam(value.toLowerCase());
  };

  const handleChangeFilter = (event) => {
    const { value } = event.target;
    setFilterParam(value);
  };

  return (
    <div className="app__all-news all-news">
      {error && <Alert message={error} type="error" />}
      <select
        className="all-news__selector selector"
        defaultValue="all"
        onChange={handleChangeFilter}
      >
        <option className="selector__all" value="all">by all</option>
        <option className="selector__author" value="author">by authors</option>
        <option className="selector__tags" value="tags">by tags</option>
      </select>
      <input className="all-news__search" onChange={handleChange} type="search" />
      <div className="all-news__news-cards news-cards">
        {searchResult.map((el) => (
          <NewsComponent
            id={el.id}
            title={el.title}
            content={el.content}
            tags={el.tags}
            author={el.author}
            image={el.image}
          />
        ))}
      </div>
    </div>
  );
};

export default AllNewsPage;
