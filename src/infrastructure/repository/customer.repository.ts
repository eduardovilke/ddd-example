import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer) {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    })
  }

  async update(entity: Customer) {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints
      }, 
      { 
        where: { 
          id: entity.id 
        } 
      }
    )
  }

  async find(id: string) {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({where: { id }, rejectOnEmpty: true})
    } catch (error) {
      throw new Error('Customer not found')
    }

    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    )
    customer.changeAddress(address)
    return customer;
  }

  async findAll() {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map((customerModels) => {
      let customer = new Customer(customerModels.id, customerModels.name);
      customer.addRewardPoints(customerModels.rewardPoints);
      const address = new Address(
        customerModels.street,
        customerModels.number,
        customerModels.zipcode,
        customerModels.city
      )
      customer.changeAddress(address);
      if(customerModels.active) {
        customer.activate()
      }
      return customer
    })
  }

}