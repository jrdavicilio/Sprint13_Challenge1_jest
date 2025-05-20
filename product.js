let products = []
let id = 0

function getProducts() {
    return products
}

function resetProducts() {
    products = []
    id = 0
}

function getProduct(id) {
    const product = products.find(product => product.id === id);
    if (!product) {
        throw new Error('product not found');
    }
    return product;
}

function addProduct(name, price) {
    if (name === undefined) throw new Error('name is not defined');
    if (price === undefined) throw new Error('price is not defined');
    if (products.find(product => product.name === name)) {
        throw new Error('product already exists');
    }

    const product = {
        id: id,
        name: name,
        price: price,
    };
    products.push(product);
    id++;
    return product;
}

function removeProduct(id) {
    const i = products.findIndex(product => product.id === id);
    if (i !== -1) {
        products.splice(i, 1);
        return true;
    }
    throw new Error('product not found');
}

function updateProduct(id, name, price) {
    const i = products.findIndex(product => product.id === id);
    if (i === -1) {
        throw new Error('product not found');
    }
    if (name !== undefined) {
        products[i].name = name;
    }
    if (price !== undefined) {
        products[i].price = price;
    }
    return true;
}

module.exports = {
    getProducts,
    resetProducts,
    getProduct,
    addProduct,
    removeProduct,
    updateProduct
}