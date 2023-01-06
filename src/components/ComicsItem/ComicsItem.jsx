import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../resources/img/defaulImage.png';

function ComicsItem(props) {
  const {
    comicsData: { title, id, thumbnail, price },
  } = props;
  const image = thumbnail === 'undefined.undefined' ? defaultImage : thumbnail;
  return (
    <li className='comics__item'>
      <Link to={`/comics/${id}`}>
        <img src={image} alt='ultimate war' className='comics__item-img' />
        <div className='comics__item-name'>{title}</div>
        <div className='comics__item-price'>{price}</div>
      </Link>
    </li>
  );
}

export default ComicsItem;
