function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function cartItemClickListener(event) {
  event.target.remove();
}

// req.2 essa função abaixo já estava implementada.
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function returnProduct() {
  const computador = await fetchProducts('computador');
  computador.results.forEach((product) => {
    const obj = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    const section = document.querySelector('.items');
    section.appendChild(createProductItemElement(obj));
  });
}
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

 const getItems = async (id) => {
  const ol = document.querySelectorAll('.cart__items')[0];
  const itemJSON = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = itemJSON;
  ol.appendChild(createCartItemElement({ sku, name, salePrice }));
};

function clickButton() {
  const items = document.querySelectorAll('.item');
  items.forEach((element) => {
  const button = element.querySelector('button');
  const sku = getSkuFromProductItem(element);
    button.addEventListener('click', () => {
      getItems(sku);
    });
  });
}
const deletCart = () => {
  const itenCart = document.querySelector('.cart__items');
  itenCart.innerHTML = '';
};
const emptycart = () => {
  const empty = document.querySelector('.empty-cart');
  empty.addEventListener('click', deletCart);
};
window.onload = async () => {
  await returnProduct();
  clickButton();
  emptycart();
};
