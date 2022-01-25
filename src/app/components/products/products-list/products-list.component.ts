import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../../state/product.state";
import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() products$:Observable<AppDataState<Product[]>>|null=null;
  @Output() productEventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();
  readonly DtaStateEnum=DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: any) {
    this.productEventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:p});
  }

  onDelete(p: any) {
    this.productEventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:p});
  }

  onEdit(p: any) {
    this.productEventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:p});
  }

  onActionEventItem($event: ActionEvent) {
      this.productEventEmitter.emit($event);

  }
}
