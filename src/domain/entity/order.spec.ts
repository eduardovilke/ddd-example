import Order from "./order"
import OrderItem from "./order-item"

describe('Order unit tests', () => {
  it('Should throw error when id is empty', () => {
    expect(() => new Order('', '123', [])).toThrow('Id is required')
  })
  it('Should throw error when customerId is empty', () => {
    expect(() => new Order('123', '', [])).toThrow('CustomerId is required')
  })
  it('Should throw error when items are empty', () => {
    expect(() => new Order('123', '123', [])).toThrow('Items are required')
  })

  it('Should calculate total', () => {
    const item1 = new OrderItem('1', 'Item 1', 10, 'p1', 1);
    const item2 = new OrderItem('2', 'Item 2', 10, 'p2', 3);
    const order = new Order('123', '123', [item1, item2])

    expect(order.total()).toEqual(40);
  })

  it('Should throw error if the item qte is less or equal zero', () => {
    expect(() => {
      const item1 = new OrderItem('1', 'Item 1', 10, 'p1', 0);
      const order = new Order('123', '123', [item1])
    }).toThrow('Quantity must be greater than zero')
  })
})