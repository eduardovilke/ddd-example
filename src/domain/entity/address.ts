export default class Address {
  _street = "";
  _number = 0;
  _zip = "";
  _city = "";

  constructor (
    street: string,
    number: number,
    zip: string,
    city: string,
  ) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate()
  }

  validate() {
    if(this._street.length === 0) {
      throw new Error('Name is required')
    }
    if(this._number === 0) {
      throw new Error('Id is required')
    }
    if(this._zip.length === 0) {
      throw new Error('Id is required')
    }
    if(this._city.length === 0) {
      throw new Error('Id is required')
    }
  }

  toString(){
    return `${this._street} ${this._number} ${this._zip} ${this._city}`
  }
}