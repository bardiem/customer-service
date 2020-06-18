import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NgbDateStruct,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';

import { BuyService } from 'src/app/service/buy.service';
import { ProductService } from 'src/app/service/product.service';
import { CustomerService } from 'src/app/service/customer.service';
import { SalespersonService } from 'src/app/service/salesperson.service';

import Product from 'src/app/models/product.model';
import Customer from 'src/app/models/customer.model';
import Salesperson from 'src/app/models/salesperson.model';

@Component({
  selector: 'app-add-buy',
  templateUrl: './add-buy.component.html',
  styleUrls: ['./add-buy.component.css'],
})
export class AddBuyComponent implements OnInit {
  addBuyForm: FormGroup;

  products: Product[] = [];
  customers: Customer[] = [];
  salespeople: Salesperson[] = [];

  submitted = null;
  errorMessage: any;

  price: any = '';

  constructor(
    private buyService: BuyService,
    private productService: ProductService,
    private customerService: CustomerService,
    private salespersonService: SalespersonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
    this.salespersonService
      .getSalespeople()
      .subscribe((salespeople: Salesperson[]) => {
        this.salespeople = salespeople;
      });

    this.addBuyForm = this.formBuilder.group({
      _custId: [
        'виберіть покупця',
        [Validators.required, Validators.pattern('\\S+.')],
      ],
      _pdtId: [
        'виберіть продукт',
        [Validators.required, Validators.pattern('\\S+.')],
      ],
      _saleId: [
        'виберіть продавця',
        [Validators.required, Validators.pattern('\\S+.')],
      ],
      quantity: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')],
      ],
      orderDate: ['order date', Validators.required],
      deliverDate: ['deliver date', Validators.required],
      cancel: [false],
    });
  }

  onSubmit() {
    let orderDateDate = this.ngbDateToDate(
      this.addBuyForm.get('orderDate').value
    );
    let deliverDateDate = this.ngbDateToDate(
      this.addBuyForm.get('deliverDate').value
    );
    this.addBuyForm.controls['orderDate'].setValue(orderDateDate);
    this.addBuyForm.controls['deliverDate'].setValue(deliverDateDate);


    this.buyService.createBuy(this.addBuyForm.value).subscribe(
      (data) => {
        this.submitted = true;
        setTimeout(
          () => (this.addBuyForm.reset(), (this.submitted = null)),
          1000
        );
      },
      (error) => {
        this.submitted = false;
        this.errorMessage = error;
      }
    );
  }

  onCancel() {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
    });
  }

  ngbDateToString(ngbDate: NgbDateStruct) {
    return this.ngbDateParserFormatter.format(ngbDate);
  }

  ngbDateToDate(ngbDate: NgbDateStruct) {
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  dateFailed() {
    return (
      this.ngbDateToString(this.addBuyForm.controls['orderDate'].value) >
      this.ngbDateToString(this.addBuyForm.controls['deliverDate'].value)
    );
  }

  selectProduct(args) {
    if (args.target.value === 'виберіть продукт') {
      this.price = '';
      this.addBuyForm.controls['_pdtId'].setValue('виберіть продукт');
    } else {
      this.price = this.products.find(
        ({ _id }) => _id === args.target.value
      ).unitprice;
      this.addBuyForm.controls['_pdtId'].setValue(args.target.value);
    }
  }

  selectCustomer(args) {
    if (args.target.value === 'виберіть покупця') {
      this.addBuyForm.controls['_custId'].setValue('виберіть покупця');
    } else {
      this.addBuyForm.controls['_custId'].setValue(args.target.value);
    }
  }

  selectSalesperson(args) {
    if (args.target.value === 'виберіть продавця') {
      this.addBuyForm.controls['_saleId'].setValue('виберіть продавця');
    } else {
      this.addBuyForm.controls['_saleId'].setValue(args.target.value);
    }
  }
}
