class ProductDto {
  constructor() {
    this._id = "";
    this._title = "";
    this._price = 0;
    this._imgUrl = "";
    this._description = "";
  }
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }
  get price() {
    return this._price;
  }
  set price(value) {
    this._price = value;
  }
  get imgUrl() {
    return this._imgUrl;
  }
  set imgUrl(value) {
    this._imgUrl = value;
  }
  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
}
// module.exports = ProductoDto;


module.exports = ProductDto;