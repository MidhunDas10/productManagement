import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddPopupInjectedDataModel, Product } from '../models/product.model';

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
  private formBuilder : FormBuilder,
  private dialog : MatDialog,
) {}
ngOnInit(): void {
  console.log(this.data)
  this.initializeForm()
}
/**
 * Function to initialize form for adding new products
 */
initializeForm(): void {
  this.productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    description: ['', [Validators.required, Validators.minLength(150)]],
    id: '',
    shortDescription: ['', [Validators.required]],
    price: [null, [Validators.required]],
    rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    location: ['', [Validators.required]],
    inStock: false,
    isTrash: false
  });
}
/**
 * Function to handle submit button click
 */
onSubmit(): void {
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
