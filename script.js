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

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const totalPriceInCart = async () => {
  const totalPrice = document.querySelector('.total-price');
  const items = document.querySelectorAll('.cart__item');
  const arrayPrice = [];
  items.forEach((item) => {
    const price = JSON.parse(item.innerHTML.split('$')[1]);
    arrayPrice.push(price);
  });
  if (listItems.innerHTML === '') {
    totalPrice.innerText = '';
  } else {
    const total = arrayPrice.reduce((acc, price) => acc + price, 0);
    totalPrice.innerText = total;
  }
};

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(listItems.innerHTML);
  totalPriceInCart();
};

const cleanCart = () => {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    listItems.innerHTML = '';
    totalPriceInCart();
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
  totalPriceInCart();
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
  const loading = document.querySelector('.loading');
  const items = document.querySelector('.items');
  const data = await fetchProducts(product);
  loading.remove();
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
  totalPriceInCart();
};
