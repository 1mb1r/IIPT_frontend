import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import 'antd/dist/antd.css';

const NewsComponent = ({
  id, title, author, content, tags, image,
}) => {
  const { Meta } = Card;
  return (
    <div className="news-cards__card card">
      <Link to={`/news/${id}`}>
        <Card
          style={{ width: 300 }}
          cover={(
            <img
              alt={title}
              src={image}
            />
              )}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={title}
            description={content}
          />
          <Meta
            title={author}
            description={tags}
          />
        </Card>
      </Link>
    </div>
  );
};

export default NewsComponent;

NewsComponent.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
