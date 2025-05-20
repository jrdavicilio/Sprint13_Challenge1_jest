const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

describe('Adding Products', () => {
  beforeEach(() => {
    resetProducts();
  });

  it('should add a product', () => {
    const newProduct = addProduct('ProductoNuevo', 20);
    expect(newProduct).toEqual({
      id: 0,
      name: 'ProductoNuevo',
      price: 20
    });
    expect(getProducts()).toContainEqual(newProduct);
  });

  it('should fail when adding a repeated product', () => {
    addProduct('Producto', 10);
    expect(() => addProduct('Producto', 15)).toThrow('product already exists');
  });

  it('should fail when adding a product with no name', () => {
    expect(() => addProduct(undefined, 100)).toThrow('name is not defined');
  });

  it('should fail when adding a product with no price', () => {
    expect(() => addProduct('Producto', undefined)).toThrow('price is not defined');
  });
});

describe('Removing Products', () => {
  beforeEach(() => {
    resetProducts();
    addProduct('Producto1', 10);
    addProduct('Producto2', 20);
  });

  it('should remove a product', () => {
    const productos = getProducts();
    const productToRemove = productos[0];
    expect(removeProduct(productToRemove.id)).toBe(true);
    expect(getProducts()).not.toContainEqual(productToRemove);
  });

  it('should throw an error if product does not exist', () => {
    expect(() => removeProduct(999)).toThrow('product not found');
  });
});

describe('Getting a single product', () => {
  beforeEach(() => {
    resetProducts();
    addProduct('Producto1', 10);
    addProduct('Producto2', 20);
  });

  it('should get a product', () => {
    const productos = getProducts();
    const product = productos[0];
    expect(getProduct(product.id)).toEqual(product);
  });

  it('should throw an error if product does not exist', () => {
    expect(() => getProduct(999)).toThrow('product not found');
  });
});

describe('Updating Products', () => {
  beforeEach(() => {
    resetProducts();
    addProduct('Producto1', 10);
    addProduct('Producto2', 20);
  });

  it('should update a product', () => {
    const productos = getProducts();
    const product = productos[0];
    const result = updateProduct(product.id, 'NuevoNombre', 50);
    expect(result).toBe(true);
    expect(getProduct(product.id)).toEqual({
      id: product.id,
      name: 'NuevoNombre',
      price: 50,
    });
  });

  it('should fail when updating a product that does not exist', () => {
    expect(() => updateProduct(999, 'NuevoNombre', 30)).toThrow('product not found');
  });

  it('should only update the price', () => {
    const productos = getProducts();
    const product = productos[0];
    const oldName = product.name;
    const result = updateProduct(product.id, undefined, 99);
    expect(result).toBe(true);
    expect(getProduct(product.id)).toEqual({
      id: product.id,
      name: oldName,
      price: 99,
    });
  });

  it('should only update the name', () => {
    const productos = getProducts();
    const product = productos[0];
    const oldPrice = product.price;
    const result = updateProduct(product.id, 'SoloNombre', undefined);
    expect(result).toBe(true);
    expect(getProduct(product.id)).toEqual({
      id: product.id,
      name: 'SoloNombre',
      price: oldPrice,
    });
  });
});