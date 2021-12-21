/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Typography } from 'antd';

import { getImageUrl } from '../../lib/utils';

import 'antd/dist/antd.css';

const { Paragraph } = Typography;

const PostComponent = ({
  title, author, content, tags, image, userId,
}) => {
  const { Meta } = Card;
  return (
    <div className="posts-cards__card card">
      <Link to={`/users/${userId}`}>
        <Card
          style={{ width: 300 }}
          cover={image ? (
            <img
              alt={title}
              src={getImageUrl(image)}
            />
          ) : null}
        >
          <Meta
            title={title}
          />
          <Paragraph>{content}</Paragraph>
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
  image: PropTypes.string,
};
