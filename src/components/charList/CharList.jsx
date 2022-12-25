import React from 'react';
import './Charlist.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

class CharList extends React.Component {
  marvelService = new MarvelService();

  // eslint-disable-next-line react/state-in-constructor
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  itemRefs = [];

  componentDidMount() {
    this.onRequest();
  }

  setRef = (ref) => {
    this.itemRefs.push(ref);
  };

  focusOnItem = (id) => {
    this.itemRefs[id].focus();
    this.itemRefs.forEach((item) =>
      item.classList.remove('char__item_selected')
    );
    this.itemRefs[id].classList.add('char__item_selected');
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then((res) => this.onCharListLoaded(res))
      .catch(() => this.onError());
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  renderItems = () => {
    const { onCharSelected } = this.props;
    const { charList } = this.state;
    const items = charList.map(({ name, thumbnail, id }, i) => {
      const style =
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
          ? { objectFit: 'contain' }
          : { objectFit: 'cover' };
      return (
        <li
          key={id}
          tabIndex={0}
          ref={this.setRef}
          className='char__item'
          onClick={() => {
            onCharSelected(id);
            this.focusOnItem(i);
          }}
        >
          <img style={style} src={thumbnail} alt={name} />
          <div className='char__name'>{name}</div>
        </li>
      );
    });

    return <ul className='char__grid'>{items}</ul>;
  };

  render() {
    const { loading, error, newItemLoading, offset, charEnded } = this.state;
    const items = this.renderItems();
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
          onClick={() => this.onRequest(offset)}
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
