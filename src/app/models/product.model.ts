export class Product {
  id: string
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  storage: number;
  imageUrl: string;
  rating: number;
  price: number;
  isTrash: boolean;
  inStock: boolean;
  location: string

  constructor(
    id: string,
    name: string,
    shortDescription: string,
    description: string,
    category: string,
    storage: number,
    imageUrl: string,
    rating: number,
    price: number,
    isTrash: boolean,
    inStock: boolean,
    location: string,
  ) {
    this.name = name;
    this.id = id;
    this.shortDescription = shortDescription;
    this.description = description;
    this.category = category;
    this.storage = storage;
    this.rating = rating;
    this.price = price;
    this.imageUrl = imageUrl;
    this.isTrash = isTrash;
    this.inStock = inStock;
    this.location = location;
  }
}

export interface AddPopupInjectedDataModel {
  mode: string;
  productDetails: Product;
}
