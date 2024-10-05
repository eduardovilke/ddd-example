import Product from "./product"

describe('Product unit test', () => {
  it('Should throw error when id is emtpy', () => {
    expect(() => new Product('', 'Product 1', 100)).toThrow('Id is required')
  })
  it('Should throw error when name is empty', () => {
    expect(() => new Product('123', '', 100)).toThrow('Name is required')
  })

  it('Should throw error when price is less than zero', () => {
    expect(() => new Product('123', 'name', -1)).toThrow('Price must be greater than zero')
  })

  it('Should change name', () => {
    const product = new Product('123', 'Product 1', 100);
    product.changeName('Product 2')

    expect(product.name).toBe('Product 2')
  })

  it('Should change price', () => {
    const product = new Product('123', 'Product 1', 100);
    product.changePrice(200)

    expect(product.price).toBe(200)
  })
})