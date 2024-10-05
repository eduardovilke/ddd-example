import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active = false;
  private _rewardPoints = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  validate() {
    if(this._name.length === 0) {
      throw new Error('Name is required')
    }
    if(this._id.length === 0) {
      throw new Error('Id is required')
    }
  }

  get id () {
    return this._id;
  }

  get rewardPoints () {
    return this._rewardPoints;
  }

  get name () {
    return this._name
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if(this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this._active = true;
  }

  isActive() {
    return this._active;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number){
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address
  }
}