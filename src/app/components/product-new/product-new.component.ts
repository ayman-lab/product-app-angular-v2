import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  productFormGroup!:FormGroup;
  submitted:boolean=false;

  constructor(private fb:FormBuilder,private productService:ProductsService,private router:Router) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required]
    });
  }

  onSavepoduct() {
    this.submitted=true
    if (this.productFormGroup.invalid) return;
    this.productService.save(this.productFormGroup.value)
      .subscribe(data=>{
        alert("succes saving")
      });

    this.router.navigateByUrl("/products");
  }
}
