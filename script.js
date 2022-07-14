const listItems = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(listItems.innerHTML);
};

const cleanCart = () => {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    listItems.innerHTML = '';
  });
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const productItem = async (productId) => {
  const data = await fetchItem(productId);
  const { id: sku, title: name, price: salePrice } = data;
  const createLi = createCartItemElement({ sku, name, salePrice });
  listItems.appendChild(createLi);
  saveCartItems(listItems.innerHTML);
};

const recoverLocalStorage = () => {
  listItems.innerHTML = getSavedCartItems();
};

const addClickInElementsLocalStorage = () => {
  const allItemCart = document.querySelectorAll('.cart__item');
  allItemCart.forEach((item) => {
    item.classList.add('teste');
    item.addEventListener('click', cartItemClickListener);
  });
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', () => productItem(sku));
  
  return section;
};

const listProducts = async (product) => {
  const items = document.querySelector('.items');
  const data = await fetchProducts(product);
  const { results } = data;
  results.forEach((element) => {
    const { id, title, thumbnail } = element;
    const objProduct = { sku: id, name: title, image: thumbnail };
    const createItem = createProductItemElement(objProduct);
    items.appendChild(createItem);
  });
};

window.onload = () => { 
  listProducts('computador');
  recoverLocalStorage();
  addClickInElementsLocalStorage();
  cleanCart();
};
