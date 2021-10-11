import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import 'antd/dist/antd.css';

const PostComponent = ({
  title, author, content, tags, image, userId,
}) => {
  const { Meta } = Card;
  return (
    <div className="posts-cards__card card">
      <Link to={`/users/${userId}`}>
        <Card
          style={{ width: 300 }}
          cover={(
            <img
              alt={title}
              src={process.env.REACT_APP_API_URL + image}
            />
              )}
        >
          <Meta
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

export default PostComponent;

PostComponent.propTypes = {
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
