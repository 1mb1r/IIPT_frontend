/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Alert, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setPosts } from '../redux/actions/postsActionGenerators';
import PostComponent from '../components/posts/PostComponent';

import './AllPostsPage.css';

const postsPerPage = 1;

const AllPostsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPosts());
  }, [dispatch]);
  const allFiltersOptions = ['all', 'tag', 'author'];
  const { posts, fetching, error } = useSelector((state) => state.allPosts);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchState, setSearchState] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [searchResult, setSearchResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const normalizeStringAndSearch = (fieldValue) => fieldValue.toLowerCase().replaceAll('ё', 'е').includes(searchState);
  const searchPostsByFilter = () => {
    let result = [];
    if (filterState === 'all') {
      result = posts.filter((item) => allFiltersOptions.some((option) => normalizeStringAndSearch(item[option === 'all' ? 'title' : option])));
    } else {
      result = posts.filter((item) => normalizeStringAndSearch(item[filterState]));
    }
    setTotalPages(Math.ceil(result.length / postsPerPage));
    return result;
  };

  useEffect(() => {
    setSearchResult(searchPostsByFilter());
    setCurrentPage(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState, posts, filterState]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchState(value.toLowerCase());
  };

  const handleChangeFilter = (event) => {
    const { value } = event.target;
    setFilterState(value);
  };

  if (fetching) {
    return 'Loading...';
  }

  if (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
      return <Alert message={error} type="error" />;
    }
    return 'Error: hidden';
  }

  return (
    <div className="app__all-posts all-posts">
      <select
        className="all-posts__selector selector"
        defaultValue="all"
        onChange={handleChangeFilter}
      >
        {allFiltersOptions.map((option) => (
          <option key={option} className={`selector__${option}`} value={option}>{`by ${option}`}</option>
        ))}
      </select>
      <input className="all-posts__search" onChange={handleChange} type="search" />
      <div className="all-posts__posts-cards posts-cards">
        {searchResult.slice(currentPage * postsPerPage,
          (currentPage + 1) * postsPerPage).map((el) => (
            <PostComponent
              key={el.id}
              userId={el.user_id}
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
        current={currentPage + 1}
        pageSize={postsPerPage}
      />
    </div>
  );
};

export default AllPostsPage;
