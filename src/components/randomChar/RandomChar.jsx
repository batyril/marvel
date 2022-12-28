import React, { useEffect, useState } from 'react';
import './RandomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

function View(props) {
  const {
    char: { name, description, thumbnail, homepage, wiki },
  } = props;

  const style =
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ? { objectFit: 'contain' }
      : { objectFit: 'cover' };
  return (
    <div className='randomchar__block'>
      <img
        style={style}
        src={thumbnail}
        alt='Random character'
        className='randomchar__img'
      />
      <div className='randomchar__info'>
        <p className='randomchar__name'>{name}</p>
        <p className='randomchar__descr'>{description}</p>
        <div className='randomchar__btns'>
          <a href={homepage} className='button button__main'>
            <div className='inner'>homepage</div>
          </a>
          <a href={wiki} className='button button__secondary'>
            <div className='inner'>wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
}

function RandomChar() {
  const marvelService = new MarvelService();

  const [char, setChar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const onCharLoaded = (char) => {
    setLoading(false);
    setChar(char);
  };

  const updateChar = () => {
    onCharLoading();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    marvelService
      .getCharacter(id)
      .then((res) => onCharLoaded(res))
      .catch(() => onError());
  };

  useEffect(() => {
    updateChar();
  }, []);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;
  return (
    <div className='randomchar'>
      {errorMessage}
      {spinner}
      {content}
      <div className='randomchar__static'>
        <p className='randomchar__title'>
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className='randomchar__title'>Or choose another one</p>
        <button
          onClick={updateChar}
          type='button'
          className='button button__main'
        >
          <div className='inner'>try it</div>
        </button>
        <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
      </div>
    </div>
  );
}

export default RandomChar;
