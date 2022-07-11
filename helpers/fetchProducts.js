const fetchProducts = async (product) => {
  try {
    const apiURL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;  
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// id
// site_id
// title
// seller
// price
// currency_id
// available_quantity
// sold_quantity
// buying_mode
// listing_type_id
// stop_time
// condition
// permalink
// thumbnail
// accepts_mercadopago
// installments
// address
// shipping
// seller_address
// attributes
// differential_pricing
// original_price
// category_id
// official_store_id
// catalog_product_id
// tags
// catalog_listing