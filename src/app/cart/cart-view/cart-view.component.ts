import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  cartIteams : Product[] = [];
  totalprice : number = 0;

  constructor(private cartService: CartService){}


  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartIteams = data
      this.totalprice = this.getTotalPrice();
    })
  }

  getTotalPrice():  number{
    let total = 0;
    for(let item of this.cartIteams){
      total += item.price;
    }
    return total;
  }

  clearCart(): void{
    this.cartService.clearCart().subscribe();
  }

  checkout(): void {
    this.cartService.checkout(this.cartIteams).subscribe();
  }


}
