import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { getItem } from '../store/listSlice';
import Custom404 from './Custom404';

import noImage from '../assets/no-image.png';
import './ShowDetails.scss';

const ShowDetails = () => {
  const { id: showId } = useParams();

  const item = useSelector((state) => getItem(state, showId));

  if (!item) {
    return <Custom404 />;
  }

  return (
    <>
      <Link to={'/'}>Back</Link>
      <div className='details'>
        <div className='image'>
          <img
            src={item.show.image?.large || item.show.image?.medium || noImage}
            alt={`${item.show?.name} thumbnail`}
          />
        </div>
        <div className='description'>
          <h1>{item.show.name}</h1>

          <p>
            {item.show.summary?.replace(/<\/?[^>]+(>|$)/g, '') || 'No details'}
          </p>
        </div>
      </div>
    </>
  );
};

export default ShowDetails;
