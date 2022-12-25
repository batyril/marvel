import { getValidateDescription } from './validateDescription';

class MarvelService {
  apiBase = 'https://gateway.marvel.com:443/v1/public/';

  apiKey = 'apikey=1d19870e67500be4a11e889cb068a2bc';

  baseOffset = '210'

  getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`status:${res.status}`);
    }
    return res.json();
  };

  transformCharacter = (char) => ({
    id: char.id,
    name: char.name,
    description: getValidateDescription(char.description),
    thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics: char.comics.items,
  });

  getAllCharacters = async (offset = this.baseOffset) => {
    const res = await this.getResourse(
      `${this.apiBase}characters?limit=9&offset=${offset}&${this.apiKey}`
    );
    return res.data.results.map((obj) => this.transformCharacter(obj));
  };

  getCharacter = async (id) => {
    const res = await this.getResourse(
      `${this.apiBase}characters/${id}?${this.apiKey}`
    );
    return this.transformCharacter(res.data.results[0]);
  };
}

export default MarvelService;
