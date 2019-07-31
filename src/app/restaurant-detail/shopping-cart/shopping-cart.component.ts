import { Component, OnInit } from '@angular/core';
import { ShoppingCardService } from './shopping-cart.service';
import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
   preserveWhitespaces: true, //Deixa os espaços em branco ao compilar, configutar individualmente
  animations:[
    trigger('linha', [
      state('ready', style({opacity: 1})),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style({opacity: 0, transform: 'translateX(-30px)', offset: 0}),
        style({opacity: 0.8, transform: 'translateX(10px)', offset: 0.8}),
        style({opacity: 1, transform: 'translateX(0px)', offset: 1})
      ]))),
      transition('ready => void', animate('300ms 0s ease-out', keyframes([
        style({opacity: 1, transform: 'translateX(0px)', offset: 0}),
        style({opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2}),
        style({opacity: 0, transform: 'translateX(30px)', offset: 1})
      ])))
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingServ: ShoppingCardService) { }

  ngOnInit() {
  }

  estadoLinha = "ready";

  limpar(){
    this.shoppingServ.clear();
  }

  items(): CartItem[]{
    return this.shoppingServ.items;
  }

  total(): number{
    return this.shoppingServ.total();
  }

  removeItem(item: CartItem){
    this.shoppingServ.removeItem(item);
  }

  addItem(item: MenuItem){
    this.shoppingServ.addItem(item);
    console.log(this.items().length);
  }


}
