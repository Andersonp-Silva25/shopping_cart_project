require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('checks if "fetchItem" is a function', () => {
    expect.assertions(1);
    expect(typeof(fetchItem)).toEqual('function');
  })

  it('checks if "fetch" was called', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('check if you are using the correct endpoint', async () => {
    expect.assertions(1);
    const apiURL = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(apiURL);
  });

  it('check if the data structure of the returned object is the same as the structure of "item"', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('checks if when calling the function without parameter, an error is displayed', async () => {
    expect.assertions(1);
    const error = 'You must provide an url';
    expect(await fetchItem()).toEqual(new Error(error));      
  });

});
