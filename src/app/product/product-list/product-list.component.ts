import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []
  filteredproducts: Product[]=[]
  sortOrder: string=""

  constructor(private productService: ProductService,
    private cartservice: CartService,private snackbar: MatSnackBar){}

  ngOnInit(): void {
    this.productService.getProduct().subscribe(data => {
      this.products = data;
      this.filteredproducts = data;
    })
  }

  addToCart(product: Product): void{
    this.cartservice.addToCart(product).subscribe({
      next: () =>{
        this.snackbar.open("Product Added to cart!","",{
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    });
  }

  applyFilter(event: Event): void {
    let searchterm = (event.target as HTMLInputElement).value;
    searchterm = searchterm.toLowerCase();

    this.filteredproducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchterm)
    )

    this.sortProduct(this.sortOrder);
  }

  sortProduct(sortvalue: string){
    this.sortOrder = sortvalue;

    if(this.sortOrder === "priceLowHigh"){
      this.filteredproducts.sort((a,b) => a.price - b.price );
    }else if(this.sortOrder === "priceHighLow"){
      this.filteredproducts.sort((a,b) => b.price - a.price );
    }
  }

}
