import { Product } from './../models/product.model';
import { Component, OnInit, OnDestroy, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  pricerangeFilterActive = false
  ratingrangeFilterActive = false
  ratingFilterActive = false
  inStockValue = false
  maxPrice = 50000
  minPrice = 0
  maxRating = 5
  minRating = 0
  searchText =''
  toggleSearch: boolean = false;
  /**
   * Function to format label content
   * @param value  number
   * @returns string
   */
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  products!: Product[];
  dataReady = false
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private localStorageService: LocalStorageServiceService,
  ) {}
  ngOnInit(): void {
    this.getDataFromLocalstorage();
  }
  /**
   * Funtion to retrive data from local Storage
   */
  getDataFromLocalstorage(): void {
    this.products =  this.localStorageService.getProductsList()
    this.dataReady = true;
  }
  /**
   * Funtion to handle remove button click event
   * @param product Product
   */
  onRemoveClick(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{ //open confirmation dialog
      data:{
        message: 'Are you sure want to soft delete this item ? (You can still find this item in trash and restore it)',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => { // hamdle dialog after close event
      if (confirmed) {
        product.isTrash = true; //soft delete is performed using a key isTrash
      }
    });
  }
  /**
   * Function to handle Add/Edit product Button click event
   * @param mode string
   */
  openAddOrEditOverlay(mode: string, productDetails = null): void {
    this.dialog.open(AddProductComponent,  { //open add product pop up
      width: '800px',
      height: '900px',
      data: {
        mode: mode,
        productDetails: productDetails
      }
    }).afterClosed().subscribe(res => {
      this.getDataFromLocalstorage();
    })
  }
  /**
   * Funtion to navigate to product details page on card click
   * @param product Product
   */
  onProductCardClick(product: Product) :void {
    this.router.navigate(['/product', product.id]);
  }
  /**
   * Function to handle both filter active , inactive actions
   * @param event MatCheckboxChange
   * @param filterType string
   */
  filterActiveValueChange(event: MatCheckboxChange, filterType: string): void {
      if (filterType === 'priceFilter') {
        this.pricerangeFilterActive = event.checked
        this.onFilterValueChange()
      } else if (filterType === 'ratingFilter') {
        this.ratingrangeFilterActive = event.checked
        this.onFilterValueChange()
      }
    }
    /**
     * Function to handle filter value change events and sort products accordingly
     */
    onFilterValueChange(): void {
    if (this.pricerangeFilterActive && !this.ratingFilterActive) {
      this.getDataFromLocalstorage()
      this.products = this.products.filter((product: Product) => product.price <= this.maxPrice  && product.price >= this.minPrice) ;
    }  else if (this.ratingrangeFilterActive && !this.pricerangeFilterActive) {
      this.getDataFromLocalstorage()
      this.products = this.products.filter((product: Product) => product.rating <= this.maxRating  && product.rating >= this.minRating) ;
    } else if (this.ratingrangeFilterActive && this.pricerangeFilterActive) {
      this.getDataFromLocalstorage()
      this.products = this.products.filter((product: Product) => product.rating <= this.maxRating  && product.rating >= this.minRating &&  product.price <= this.maxPrice  && product.price >= this.minPrice) ;
    } else {
      this.getDataFromLocalstorage()
    }
  }
  ngOnDestroy(): void {
    localStorage.setItem('data',JSON.stringify(this.products));
  }
}
