import React, { useEffect, useState } from 'react';
import './ComicsList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import ComicsItem from '../ComicsItem/ComicsItem';

function ComicsList() {
  const [offset, setOffset] = useState(0);
  const [comicsList, setComicsList] = useState([]);
  const [comicsEnded, setCharEnded] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const { getAllComics, loading, error } = useMarvelService();

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList((charList) => [...charList, ...newComicsList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const onRequest = (offsetNumber, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offsetNumber).then((res) => onComicsListLoaded(res));
  };

  useEffect(() => {
    getAllComics(offset).then((res) => onComicsListLoaded(res));
  }, []);

  const renderItems = (arr) => {
    const items = arr.map((comics) => (
      <ComicsItem key={comics.id} comicsData={comics} />
    ));
    return <ul className='comics__grid'>{items}</ul>;
  };

  const items = renderItems(comicsList);
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  return (
    <div className='comics__list'>
      {spinner}
      {errorMessage}
      {items}
      <button
        style={{ display: comicsEnded ? 'none' : 'block' }}
        disabled={newItemLoading}
        onClick={() => onRequest(offset)}
        type='button'
        className='button button__main button__long'
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
}

export default ComicsList;
