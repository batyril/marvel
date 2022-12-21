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
  };

  componentDidMount() {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters()
      .then((res) => this.onCharListLoaded(res))
      .catch(() => this.onError());
  }

  onCharListLoaded = (charList) => {
    this.setState({ charList, loading: false });
  };

  onCharListLoading = () => {
    this.setState({ loading: true });
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
    const items = charList.map(({ name, thumbnail, id }) => {
      const style =
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
          ? { objectFit: 'contain' }
          : { objectFit: 'cover' };
      return (
        <li key={id} className='char__item' onClick={() => onCharSelected(id)}>
          <img style={style} src={thumbnail} alt={name} />
          <div className='char__name'>{name}</div>
        </li>
      );
    });

    return <ul className='char__grid'>{items}</ul>;
  };

  render() {
    const { loading, error } = this.state;
    const items = this.renderItems();
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className='char__list'>
        {spinner}
        {errorMessage}
        {content}
        <button type='button' className='button button__main button__long'>
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
