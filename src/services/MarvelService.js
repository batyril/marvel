import { getValidateDescription } from './validateDescription';
import HttpHook from '../components/hooks/http.hook';

const useMarvelService = () => {
  const { loading, request, error, clearError } = HttpHook();

  const apiBase = 'https://gateway.marvel.com:443/v1/public/';

  const apiKey = 'apikey=1d19870e67500be4a11e889cb068a2bc';

  const baseOffset = '210';

  const transformCharacter = (char) => ({
    id: char.id,
    name: char.name,
    description: getValidateDescription(char.description),
    thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics: char.comics.items,
  });

  const transformComics = (comics) => ({
    language: comics.textObjects[0]?.language,
    description: comics.description,
    title: comics.title,
    id: comics.id,
    thumbnail: `${comics.images[0]?.path}.${comics.images[0]?.extension}`,
    price: comics.prices[0].price
      ? `${comics.prices[0].price}$`
      : 'not available',
  });

  const getAllCharacters = async (offset = baseOffset) => {
    const res = await request(
      `${apiBase}characters?limit=9&offset=${offset}&${apiKey}`
    );
    return res.data.results.map((obj) => transformCharacter(obj));
  };

  const getCharacter = async (id) => {
    const res = await request(`${apiBase}characters/${id}?${apiKey}`);
    return transformCharacter(res.data.results[0]);
  };
  const getComic = async (id) => {
    const res = await request(`${apiBase}comics/${id}?${apiKey}`);
    return transformComics(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${apiBase}comics?limit=8&offset=${offset}?&${apiKey}`
    );
    console.log(res.data.results);
    return res.data.results.map((obj) => transformComics(obj));
  };

  return {
    loading,
    error,
    getCharacter,
    getAllCharacters,
    clearError,
    getAllComics,
    getComic,
  };
};

export default useMarvelService;
