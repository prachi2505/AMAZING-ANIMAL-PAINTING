import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apicartUrl = environment.apiUrl + "/cart";
  private apicheckoutUrl = environment.apiUrl + "/checkout";

  constructor(private http: HttpClient) { }

  addToCart(product: Product): Observable<Product>{
    return this.http.post<Product>(this.apicartUrl, product);
  }

  getCartItems() : Observable<Product[]>{
    return this.http.get<Product[]>(this.apicartUrl);
  }

  clearCart() : Observable<void>{
    return this.http.delete<void>(this.apicartUrl);
  }

  checkout(product: Product[]): Observable<void>{
    return this.http.post<void>(this.apicheckoutUrl, product);
  }


}
