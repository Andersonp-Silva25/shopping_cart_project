require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('checks if the fetchProducts function is indeed a function', () => {
    expect.assertions(1);
    expect(typeof(fetchProducts)).toEqual('function');
  });

  it('checks if "fetch" was called', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('check if you are using the correct endpoint', async () => {
    expect.assertions(1);
    const apiURL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith(apiURL);
  });

  it('check if the data structure of the returned object is the same as the structure of "computerSearch"', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('checks if when calling the function without parameter, an error is displayed', async () => {
    expect.assertions(1);
    const error = 'You must provide an url';
    expect(await fetchProducts()).toEqual(new Error(error));      
  });

});
