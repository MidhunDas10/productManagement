import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit, OnDestroy {
  products!: Product[];
  dataReady = false
  ngOnInit(): void {
    this.getDataFromLocalstorage();
  }
  /**
   * Function to retrive data from local storage
   */
  getDataFromLocalstorage(): void {
    const arrayString = localStorage.getItem('data');
    this.products =  arrayString ?  JSON.parse(arrayString) : [];
    this.dataReady = true;
  }
  /**
   * Function to handle restore button click event
   * @param product Product
   */
  onRestoreClick(product: Product): void {
    product.isTrash = false;
  }
  ngOnDestroy(): void {
    localStorage.setItem('data',JSON.stringify(this.products));
  }
}
