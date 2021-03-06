import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ReportService } from 'src/app/service/report.service';
import { BuyService } from 'src/app/service/buy.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product.service';
import { SalespersonService } from 'src/app/service/salesperson.service';
import { EmployeeService } from 'src/app/service/employee.service';

import Detail from 'src/app/models/detail.model';
import Report from 'src/app/models/report.model';
import Buy from 'src/app/models/buy.model';
import Product from 'src/app/models/product.model';
import Customer from 'src/app/models/customer.model';
import Salesperson from 'src/app/models/salesperson.model';
import Employee from 'src/app/models/employee.model';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
})
export class AddReportComponent implements OnInit {
  addReportForm: FormGroup;

  details: any[] = [];
  buys: Buy[] = [];
  products: Product[] = [];
  customers: Customer[] = [];
  salespeople: Salesperson[] = [];
  employees: Employee[] = [];

  submitted = null;
  errorMessage: any;

  constructor(
    private reportService: ReportService,
    private buyService: BuyService,
    private productService: ProductService,
    private customerService: CustomerService,
    private salespersonService: SalespersonService,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buyService.getBuys().subscribe((buys: Buy[]) => {
      this.buys = buys;
    });
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
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });

    this.buyService.getBuys().subscribe((buys: Buy[]) =>{
      this.buys = buys;
    });


    this.buyService.getBuys().subscribe((buys: Buy[]) => {
      buys.forEach((buy) => {
        let product = this.products.find(({ _id }) => _id === buy._pdtId);
        let customer = this.customers.find(({ _id }) => _id === buy._custId);
        let salesperson = this.salespeople.find(
          ({ _id }) => _id === buy._saleId
        );

        this.details.push({
          _buyId: buy._id,
          _pdtId: product._id,
          custUsername: customer.username,
          saleUsername: salesperson.username,
          itemname: product.itemname,
          brand: product.brand,
          unitprice: product.unitprice,
          quantity: buy.quantity,
          orderDate: buy.orderDate,
          deliverDate: buy.deliverDate
        });
      });
    });


    this.addReportForm = this.formBuilder.group({
      _buyId: [
        'виберіть покупку',
        [Validators.required, Validators.pattern('\\S+.')],
      ],
      _emplId: [
        'виберіть працівника',
        [Validators.required, Validators.pattern('\\S+.')],
      ],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      complaint: ['', [Validators.required, Validators.minLength(3)]],
      status: [{ value: 'false', disabled: true }, Validators.required]
    });
  }

  onSubmit() {
    this.reportService.createReport(this.addReportForm.value).subscribe(
      (data) => {
        this.submitted = true;
        setTimeout(
          () => (this.addReportForm.reset(), (this.submitted = null)),
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

  selectBuy(args) {
    if (args.target.value === 'виберіть покупку') {
      this.addReportForm.controls['_buyId'].setValue('виберіть покупку');
    } else {
      this.addReportForm.controls['_buyId'].setValue(args.target.value);
    }
  }

  selectEmployee(args) {
    if (args.target.value === 'виберіть працівника') {
      this.addReportForm.controls['_emplId'].setValue('виберіть працівника');
    } else {
      this.addReportForm.controls['_emplId'].setValue(args.target.value);
    }
  }

}
