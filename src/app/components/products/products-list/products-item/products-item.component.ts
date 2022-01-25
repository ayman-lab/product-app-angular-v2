import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, ProductActionsTypes} from "../../../../state/product.state";
import {Product} from "../../../../models/product.model";

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input() product?:Product;
  @Output() productEventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.productEventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:product});
  }

  onDelete(product: Product) {
    this.productEventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:product});

  }

  onEdit(product: Product) {
    this.productEventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:product});

  }
}
