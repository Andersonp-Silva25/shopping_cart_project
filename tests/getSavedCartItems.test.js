const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('checks if "localstorage.getItem" was called', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('checks if "localstorage.getItem" was called with the parameter "cartItems"', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
