import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor() { }

  getProductsList() {
    const arrayString = localStorage.getItem('data');
    return arrayString ?  JSON.parse(arrayString) : [];
  }
  getProductDetailsById(id: string): Product {
    const arrayString = localStorage.getItem('data');
    const productList = arrayString ?  JSON.parse(arrayString) : [];
    const selectedProduct = productList.filter((product: Product) => product.id === id );
    return selectedProduct[0]
  }
  setData() {
    const data = [
      {
        id: 'iphone13',
        name: 'IPHONE 13',
        shortDescription: 'Lorem ipsum dolor sit amett',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'iphone',
        storage: 128,
        rating: 3,
        price: 59000,
        imageUrl: 'assets/iphone13.jpg',
        isTrash: false,
        inStock: true,
        location: 'kochi'
      },
      {
        id: 'iphone14',
        name: 'IPHONE 14',
        shortDescription: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'iphone',
        storage: 256,
        rating: 4,
        price: 69000,
        imageUrl: 'assets/iphone14.jpg',
        isTrash: false,
        inStock: false,
        location: 'banglore'
      },
      {
        id: 'iphone13mini',
        name: 'IPHONE 13 MINI',
        shortDescription: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'iphone',
        storage: 256,
        rating: 4,
        price: 49000,
        imageUrl: 'assets/iphone13mini.jpg',
        isTrash: false,
        inStock: false,
        location: 'chennai'
      },
      {
        id: 'iphone15',
        name: 'IPHONE 15',
        shortDescription: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'iphone',
        storage: 256,
        rating: 4,
        price: 89000,
        imageUrl: 'assets/iphone15.jpg',
        isTrash: false,
        inStock: false,
        location: 'manglore'
      },
      {
        id: 'galaxys22Ultra',
        name: 'SAMSUNG GALAXY S22',
        shortDescription: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'samsung',
        storage: 256,
        rating: 4,
        price: 89000,
        imageUrl: 'assets/galaxys22Ultra.webp',
        isTrash: false,
        inStock: false,
        location: 'hydrabad'
      },
      {
        id: 'oneplus11r',
        name: 'ONEPLUS 11R',
        shortDescription: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'oneplus',
        storage: 256,
        rating: 4,
        price: 45000,
        imageUrl: 'assets/oneplus11r.jpg',
        isTrash: false,
        inStock: false,
        location: 'delhi'
      },
    ]
    localStorage.setItem('data',JSON.stringify(data));
  }
}
