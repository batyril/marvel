import React, { useEffect, useState, useRef } from 'react';
import './Charlist.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';

function CharList(props) {
  const { loading, error, getAllCharacters } = useMarvelService();

  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const onRequest = (offsetNumber, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offsetNumber).then((res) => onCharListLoaded(res));
  };

  useEffect(() => {
    onRequest(offset, true);
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
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  return (
    <div className='char__list'>
      {spinner}
      {errorMessage}
      {items}
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
