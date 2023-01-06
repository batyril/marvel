import React, { useEffect, useState } from 'react';
import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import defaultImage from '../../resources/img/defaulImage.png';

function SingleComicPage() {
  const { comicId } = useParams();
  const [comicData, setComicData] = useState({});
  const { loading, error, getComic } = useMarvelService();

  const onComicLoaded = (char) => {
    setComicData(char);
  };

  const updateComic = () => {
    getComic(comicId).then((res) => onComicLoaded(res));
  };

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comicData) ? (
    <View comic={comicData} />
  ) : null;

  return (
    <div className='single-comic'>
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

function View(props) {
  const {
    comic: { thumbnail, title, description, language, price },
  } = props;
  const image = thumbnail === 'undefined.undefined' ? defaultImage : thumbnail;
  return (
    <>
      <img src={image} alt='x-men' className='single-comic__img' />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{title}</h2>
        <p className='single-comic__descr'>{description}</p>
        <p className='single-comic__descr'>144 pages</p>
        <p className='single-comic__descr'>Language: {language}</p>
        <div className='single-comic__price'>{price}</div>
      </div>
      <Link to='/comics' className='single-comic__back'>
        Back to all
      </Link>
    </>
  );
}

export default SingleComicPage;
