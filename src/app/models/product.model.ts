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
  inStock: boolean

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
    inStock: boolean
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
  }
}
