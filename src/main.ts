import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order-item";

let customer = new Customer('123', 'Eduardo')
const address = new Address('rua sao paulo', 270, '88310190', 'Itajai')
customer.Address = address;
customer.activate();
