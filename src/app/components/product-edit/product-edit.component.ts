import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../models/product.model";
import {Observable} from "rxjs";
import {AppDataState} from "../../state/product.state";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId:number;
  productFormGroup?:FormGroup;
  submitted:boolean=false;
  products$:Observable<Product>|null=null;
  constructor(private activatedRoute:ActivatedRoute,
              private productService:ProductsService,
              private fb:FormBuilder) {
    this.productId=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId)
      .subscribe(data=>{
        this.productFormGroup=this.fb.group({
          id:[data.id,Validators.required],
          name:[data.name,Validators.required],
          price:[data.price,Validators.required],
          quantity:[data.quantity,Validators.required],
          selected:[data.selected,Validators.required],
          available:[data.available,Validators.required]
        })
      });
  }

  onEditpoduct() {
    this.productService.edit(this.productFormGroup?.value)
      .subscribe(data=>{
        alert("success update")
      });
  }
}
