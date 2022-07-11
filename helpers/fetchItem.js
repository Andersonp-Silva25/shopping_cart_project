const fetchItem = async (item) => {
  try {
    const apiURL = `https://api.mercadolibre.com/items/${item}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
