const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    };

    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    })
    // return this.products;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);

    // Si no existe el producto
    if (!product) {
      throw boom.notFound('Product not found');
    }

    // Verificar si esta bloqueado
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }

    // Si sí existe el producto devolverlo
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);

    // Si no existe el producto
    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    // Si sí existe el producto actualizar
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);

    // Si no existe el producto
    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    // Si sí existe el producto
    // splice recibe un index para eliminar el objeto de esa posición y cuantos elementos eliminar a partir de es index
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;