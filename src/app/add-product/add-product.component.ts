import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddPopupInjectedDataModel, Product } from '../models/product.model';
import { ErrorService } from '../services/error.service';
import { LocalStorageServiceService } from '../services/local-storage-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
productForm!: FormGroup;
products!: Product[];
productDetails!: Product;
constructor(
  @Inject(MAT_DIALOG_DATA) public data: AddPopupInjectedDataModel,
  private dialog : MatDialog,
  public errorService: ErrorService,
  public localStorageService: LocalStorageServiceService,
) {}
ngOnInit(): void {
  console.log(this.data)
  this.initializeForm()
}
/**
 * Function to initialize form for adding new products
 */
initializeForm(): void {
  if (this.data.mode === 'add') {
    this.productForm = new FormGroup({
      name: new FormControl( null, [Validators.required, Validators.maxLength(50)]),
      imageUrl: new FormControl( null, [Validators.required, Validators.pattern('https?://.+')]),
      description: new FormControl( null, [Validators.required, Validators.minLength(150)]),
      id:  new FormControl(null),
      shortDescription: new FormControl( null, [Validators.required]),
      price: new FormControl( null, [Validators.required]),
      rating: new FormControl( 1, [Validators.required, Validators.min(1), Validators.max(5)]),
      location: new FormControl( null, [Validators.required]),
      inStock:  new FormControl(false),
      isTrash:  new FormControl(false)
    });
  } else if (this.data.mode === 'edit') {
    this.productDetails = this.data.productDetails;
    this.productForm = new FormGroup({
      name: new FormControl( this.productDetails.name, [Validators.required, Validators.maxLength(50)]),
      imageUrl: new FormControl( this.productDetails.imageUrl, [Validators.required, Validators.pattern('https?://.+')]),
      description: new FormControl( this.productDetails.description, [Validators.required, Validators.minLength(150)]),
      id:  new FormControl( this.productDetails.id),
      shortDescription: new FormControl( this.productDetails.shortDescription, [Validators.required]),
      price: new FormControl( this.productDetails.price, [Validators.required]),
      rating: new FormControl( this.productDetails.rating, [Validators.required, Validators.min(1), Validators.max(5)]),
      location: new FormControl( this.productDetails.location, [Validators.required]),
      inStock:  new FormControl(this.productDetails.inStock),
      isTrash:  new FormControl(false)
    });
  }
  
}
/**
 * Function to handle submit button click
 */
onSubmit(): void {
  if (this.productForm.valid) {
    this.data.mode === 'add' ? this.addNewProduct() : this.editExistingProduct()
    this.dialog.closeAll();
    localStorage.setItem('data',JSON.stringify(this.products));
  } else {
    this.productForm.markAllAsTouched()
  }
}
/**
 * Function to add new product
 */
addNewProduct() {
  const id = this.productForm.value.name.replace(/\s/g, '') //remove space from name to make an id
  this.productForm.patchValue({ id: id })
  const arrayString = localStorage.getItem('data');
  this.products =  arrayString ?  JSON.parse(arrayString) : [];
  this.products.push(this.productForm.value);
}
/**
 * Function to edit existing product
 */
editExistingProduct() {
  const arrayString = localStorage.getItem('data');
  this.products =  arrayString ?  JSON.parse(arrayString) : [];
  this.products = this.products.map(product => {
    if (product.id === this.productForm.value.id) {
      return this.productForm.value ; // Replace the item with the matching ID
    }
    return product; // Keep other items as they are
  });
}
/**
 * Function to close mat dialog on close button click
 */
onCloseButtonClick(): void {
  this.dialog.closeAll()
}
}
