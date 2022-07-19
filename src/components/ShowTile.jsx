import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import noImage from '../assets/no-image.png';
import './ShowTile.scss';

const ShowTile = (props) => {
  const navigate = useNavigate();

  const handleClickShow = useCallback(() => {
    navigate(`/details/${props.show.id}`);
  }, [navigate, props.show.id]);

  return (
    <motion.div
      layout
      className='card'
      onClick={handleClickShow}
      key={props.show.id}
    >
      <div className='thumbnail'>
        <img
          src={props.show.image?.medium || props.show.image?.large || noImage}
          alt={`${props.show?.name} thumbnail`}
          loading='lazy'
          width='210'
          height='300'
        />
      </div>
      <div className='main'>
        <div className='header'>
          <strong>{props.show?.name}</strong>
          <span className='rating'>
            {props.show.rating?.average || 'No rating yet'}
          </span>
        </div>
        <div className='description'>
          {props.show.summary?.replace(/<\/?[^>]+(>|$)/g, '') ||
            'No description to display'}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ShowTile);
