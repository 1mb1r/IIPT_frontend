import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';
import 'antd/dist/antd.css';

const NewsComponent = () => {
  const { Meta } = Card;
  const news = useSelector((state) => state.allNews.news);
  const renderList = news.map((newsElement) => {
    const {
      id, title, content,
    } = newsElement;
    return (
      <div className="app__news-list news-list" key={id}>
        <Link to={`/news/${id}`}>
          <Card
            style={{ width: 300 }}
            cover={(
              <img
                alt={title}
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              />
              )}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={title}
              description={content}
            />
          </Card>
        </Link>
      </div>
    );
  });
  return <>{renderList}</>;
};

export default NewsComponent;
