import Product from "../entity/product";
import RepositoryInterface from "./repository-inteface";

export default interface ProductRepositoryInterface 
 extends RepositoryInterface<Product> {}