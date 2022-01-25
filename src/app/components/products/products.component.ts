import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>>|null=null;
  readonly DtaStateEnum?:DataStateEnum;
   attr:boolean=true;


  constructor(private productService:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }

  onGetProducts(){
    this.products$=this.productService.getProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message()}))
    );
  }

  onGetSelectedProducts() {
    this.products$=this.productService.getSelectedProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message()}))
    );

  }

  onGegtAvailableProducts() {
    this.products$=this.productService.getAvailableProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message()}))
    );

  }

  onSerch(value:any) {
    this.products$=this.productService.searchProducts(value.keyword).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message()}))
    );

  }

  onSelect(p:any) {
    this.productService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })

  }

  onDelete(p: any) {
    let v=confirm("etes-vous sur?")
    if (v==true)
    this.productService.delete(p)
      .subscribe(data=>{
         this.onGetProducts();
      })

  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: any) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEventNavBar($event: ActionEvent) {
    switch ($event.type){
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetProducts(); break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts(); break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGegtAvailableProducts(); break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSerch($event.payload); break;
      case ProductActionsTypes.NEW_PRODUCTS: this.onNewProduct(); break;
    }
  }

  onActionEventList($event: ActionEvent) {
    switch ($event.type){
      case ProductActionsTypes.SELECT_PRODUCT: this.onSelect($event.payload); break;
      case ProductActionsTypes.EDIT_PRODUCT: this.onEdit($event.payload); break;
      case ProductActionsTypes.DELETE_PRODUCT: this.onDelete($event.payload); break;

    }
  }
}
