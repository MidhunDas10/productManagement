import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddPopupInjectedDataModel, Product } from '../models/product.model';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
productForm!: FormGroup;
products!: Product[];
constructor(
  @Inject(MAT_DIALOG_DATA) public data: AddPopupInjectedDataModel,
  private dialog : MatDialog,
  public errorService: ErrorService
) {}
ngOnInit(): void {
  console.log(this.data)
  this.initializeForm()
}
/**
 * Function to initialize form for adding new products
 */
initializeForm(): void {
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

}
/**
 * Function to handle submit button click
 */
onSubmit(): void {
  this.productForm.updateValueAndValidity
  if (this.productForm.valid) {
    const id = this.productForm.value.name.replace(/\s/g, '') //remove space from name to make an id
    this.productForm.patchValue({ id: id })
    const arrayString = localStorage.getItem('data');
    this.products =  arrayString ?  JSON.parse(arrayString) : [];
    this.products.push(this.productForm.value);
    this.dialog.closeAll();
  }
}
/**
 * Function to close mat dialog on close button click
 */
onCloseButtonClick(): void {
  this.dialog.closeAll()
}
ngOnDestroy(): void {
  localStorage.setItem('data',JSON.stringify(this.products));
}
}
