import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  dataReady = false
  productDetails!: Product
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageServiceService
    ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.productDetails =  this.localStorageService.getProductDetailsById(id);
      this.dataReady = true
    });
  }
  /**
   * Function to handle back button click event
   */
  goBack(): void {
    this.router.navigate(['/home'])
  }
}
