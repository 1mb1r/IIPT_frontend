import React, { useEffect, useState } from 'react';
import { Alert, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setNews } from '../redux/actions/NewsActions';
import NewsComponent from '../components/news/NewsComponent';
import './AllNewsPage.css';

const newsPerPage = 1;

const AllNewsPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.allNews.error);
  useEffect(() => {
    dispatch(setNews());
  }, [dispatch]);
  const allFiltersOptions = ['all', 'tags', 'authors'];
  const news = useSelector((state) => state.allNews.news);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchState, setSearchState] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [searchResult, setSearchResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const normalizeStringAndSearch = (fieldValue) => fieldValue.toLowerCase().replaceAll('ё', 'е').includes(searchState);
  const searchNewsByFilter = () => {
    let result = [];
    if (filterState === 'all') {
      result = news.filter((item) => allFiltersOptions.some((option) => normalizeStringAndSearch(item[option === 'all' ? 'title' : option])));
    } else {
      result = news.filter((item) => normalizeStringAndSearch(item[filterState]));
    }
    setTotalPages(Math.ceil(result.length / newsPerPage));
    return result;
  };

  useEffect(() => {
    setSearchResult(searchNewsByFilter());
    setCurrentPage(0);
  }, [searchState, news, filterState]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchState(value.toLowerCase());
  };

  const handleChangeFilter = (event) => {
    const { value } = event.target;
    setFilterState(value);
  };

  return (
    <div className="app__all-news all-news">
      {error && <Alert message={error} type="error" />}
      <select
        className="all-news__selector selector"
        defaultValue="all"
        onChange={handleChangeFilter}
      >
        {allFiltersOptions.map((option) => (
          <option key={option} className={`selector__${option}`} value={option}>{`by ${option}`}</option>
        ))}
      </select>
      <input className="all-news__search" onChange={handleChange} type="search" />
      <div className="all-news__news-cards news-cards">
        {searchResult.slice(currentPage * newsPerPage,
          (currentPage + 1) * newsPerPage).map((el) => (
            <NewsComponent
              key={el.id}
              id={el.id}
              title={el.title}
              content={el.content}
              tags={el.tag}
              author={String(el.author)}
              image={el.image}
            />
        ))}
      </div>
      <Pagination
        onChange={(page) => setCurrentPage(page - 1)}
        total={totalPages}
        current={currentPage}
        pageSize={newsPerPage}
      />
    </div>
  );
};

export default AllNewsPage;
