import React, { useEffect, useState, useRef } from 'react';
import './Charlist.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

function CharList(props) {
  const marvelService = new MarvelService();

  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const onCharListLoading = () => {
    setNewItemLoading(true);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setCharList((charList) => [...charList, ...newCharList]);
    setLoading((loading) => false);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const onRequest = (offsetNumber) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(offsetNumber)
      .then((res) => onCharListLoaded(res))
      .catch(() => onError());
  };

  useEffect(() => {
    onRequest();
  }, []);

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current[id].focus();
    itemRefs.current.forEach((item) =>
      item.classList.remove('char__item_selected')
    );
    itemRefs.current[id].classList.add('char__item_selected');
  };

  const renderItems = (arr) => {
    const { onCharSelected } = props;
    const items = arr.map(({ name, thumbnail, id }, i) => {
      const style =
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
          ? { objectFit: 'contain' }
          : { objectFit: 'cover' };
      return (
        <li
          key={id}
          tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el)}
          className='char__item'
          onClick={() => {
            onCharSelected(id);
            focusOnItem(i);
          }}
        >
          <img style={style} src={thumbnail} alt={name} />
          <div className='char__name'>{name}</div>
        </li>
      );
    });

    return <ul className='char__grid'>{items}</ul>;
  };

  const items = renderItems(charList);
  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error) ? items : null;
  return (
    <div className='char__list'>
      {spinner}
      {errorMessage}
      {content}
      <button
        type='button'
        style={{ display: charEnded ? 'none' : 'block' }}
        disabled={newItemLoading}
        className='button button__main button__long'
        onClick={() => onRequest(offset)}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
}

export default CharList;
