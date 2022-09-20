import axios from 'axios';

const searchData = async (term) => {
  const { data } = await axios.get(
    'https://www.googleapis.com/customsearch/v1',
    {
      params: {
        key: 'AIzaSyAznyllgswv4W74jbfS0Wmod_Cr9QS0EHI',
        cx: 'c17a7505231c54984',
        q: term,
      },
    }
  );

  return data;
}

export default searchData