import React, { useEffect, useState } from 'react';
import './CharInfo.scss';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';

function charInfo(props) {
  const { loading, error, getCharacter } = useMarvelService();

  const [charDb, setCharDb] = useState(null);

  const onCharLoaded = (char) => {
    setCharDb(char);
  };

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    getCharacter(charId).then((res) => onCharLoaded(res));
  };

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const skeleton = charDb || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !charDb) ? (
    <View char={charDb} />
  ) : null;

  return (
    <div className='char__info'>
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

charInfo.defaultProps = {
  charId: null,
};

charInfo.propTypes = {
  charId: PropTypes.number,
};

function View(props) {
  const {
    char: { name, description, thumbnail, homepage, wiki, comics },
  } = props;
  const style =
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ? { objectFit: 'contain' }
      : { objectFit: 'cover' };
  return (
    <>
      <div className='char__basics'>
        <img style={style} src={thumbnail} alt='abyss' />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>
        {comics.length === 0 ? "comics haven't been written yet" : null}
        {comics.map((item, index) => {
          if (index <= 9) {
            return (
              <li key={index} className='char__comics-item'>
                {item.name}
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}

export default charInfo;
