import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe('Customer repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite', 
      storage: ':memory',
      logging: false, 
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('1', 'Fulaninho');
    const address = new Address('Street 1', 1, 'ZipCode1', 'City1')
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1'} });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: 'Fulaninho',
      active: false,
      city: "City1",
      number: 1,
      rewardPoints: 0,
      street: "Street 1",
      zipcode: "ZipCode1",
    })
  })
  it('Should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('1', 'Fulaninho');
    const address = new Address('Street 1', 1, 'ZipCode1', 'City1')
    customer.changeAddress(address);
    await customerRepository.create(customer);

    customer.changeName('Fulano')
    await customerRepository.update(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '1'} });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      city: address.city,
      number: address.number,
      rewardPoints: customer.rewardPoints,
      street: address.street,
      zipcode: address.zip,
    })

  })
  it('Should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('1', 'Fulaninho');
    const address = new Address('Street 1', 1, 'ZipCode1', 'City1')
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it('Should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {await customerRepository.find('ASD')}).rejects.toThrow('Customer not found')
  })

  it('Should find all products', async () => {
    const customerRepository = new CustomerRepository()
    const customer1 = new Customer('1', 'Fulaninho');
    const address1 = new Address('Street 1', 1, 'ZipCode1', 'City1')
    customer1.changeAddress(address1);
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer('2', 'Fulano');
    const address2 = new Address('Street 1', 1, 'ZipCode1', 'City1')
    customer2.changeAddress(address2);
    customer2.addRewardPoints(10);
    customer2.activate();

    await Promise.all([
      customerRepository.create(customer1),
      customerRepository.create(customer2),
    ])

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1)
    expect(customers).toContainEqual(customer2)
  })
})