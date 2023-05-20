const BASE_URL = `https://pixabay.com/api/`;
const KEY = '34807686-506fe36a9d31ea04123a9732d';

export async function fetchPictures(search, page) {
  try {
    const data = await fetch(
      `${BASE_URL}?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    return await data.json();
  } catch (error) {
    console.log(error.message);
  }
}
