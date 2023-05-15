import axios from 'axios';

const API_KEY = '34827531-46fe6f83c6cd16e6040b33d37';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const response = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data.hits;
}
