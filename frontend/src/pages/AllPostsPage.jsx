/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  Alert, Pagination, Select, Input,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setPosts, authUser } from '../redux/actions/postsActionGenerators';
import PostComponent from '../components/posts/PostComponent';
import usePaging from '../hooks/usePaging';

import './AllPostsPage.css';

const postsPerPage = 4;

const AllPostsPage = () => {
  const { Option } = Select;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPosts());
  }, [dispatch]);
  const allFiltersOptions = ['all', 'tag', 'author'];
  const { posts, fetching, error } = useSelector((state) => state.allPosts);
  const [searchState, setSearchState] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [searchResult, setSearchResult] = useState([]);
  const {
    totalPages, currentPage, setCurrentPage, pageItems: postsPageItems,
  } = usePaging(postsPerPage, searchResult);
  const normalizeStringAndSearch = (fieldValue) => fieldValue.toLowerCase().replaceAll('ё', 'е').includes(searchState);
  const searchPostsByFilter = () => {
    let result = [];
    if (filterState === 'all') {
      result = posts.filter((item) => allFiltersOptions.some((option) => normalizeStringAndSearch(item[option === 'all' ? 'title' : option])));
    } else {
      result = posts.filter((item) => normalizeStringAndSearch(item[filterState]));
    }
    return result;
  };

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  useEffect(() => {
    setSearchResult(searchPostsByFilter());
    setCurrentPage(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState, posts, filterState]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchState(value.toLowerCase());
  };

  const handleChangeFilter = (value) => {
    setFilterState(value);
  };

  if (fetching) {
    return 'Loading...';
  }

  if (error) {
    if (process.env.NODE_ENV !== 'production') {
      return <Alert message={error} type="error" />;
    }
    return 'Error: hidden';
  }

  return (
    <div className="app__all-posts all-posts">
      <div className="inputs">
        <Select
          className="all-posts__selector selector"
          defaultValue="all"
          style={{ width: 120 }}
          onChange={handleChangeFilter}
        >
          <Option value="all">all</Option>
          <Option value="tag">by tag</Option>
          <Option value="author">by author</Option>
        </Select>
        <Input className="all-posts__search" onChange={handleChange} style={{ width: 220 }} type="search" />
      </div>
      <div className="all-posts__posts-cards posts-cards">
        {postsPageItems.map((el) => (
          <PostComponent
            key={el.id}
            userId={el.user_id}
            title={el.title}
            content={el.content}
            tags={el.tag}
            author={String(el.author)}
            image={el.image.url}
          />
        ))}
      </div>
      <div className="pagination">
        <Pagination
          onChange={(page) => setCurrentPage(page - 1)}
          total={totalPages}
          current={currentPage + 1}
          pageSize={postsPerPage}
        />
      </div>
    </div>
  );
};

export default AllPostsPage;
