import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomerService } from 'src/app/service/customer.service';
import Customer from 'src/app/models/customer.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  custUsername: string;
  editCustomerForm: FormGroup;
  submitted = null;
  errorMessage: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.custUsername = this.activatedRoute.snapshot.paramMap.get(
      'custUsername'
    );


    this.editCustomerForm = this.formBuilder.group({
      username: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(3)],
      ],
      firstname: ['', [Validators.required, Validators.pattern('[A-Za-zА-ЯІа-яі]+')]],
      lastname: ['', [Validators.required, Validators.pattern('[A-Za-zА-ЯІа-яі]+')]],
      address: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('[0-9]+'),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern('.+@.+[.].+')]],
    });

    this.customerService
      .getCustomer(this.custUsername)
      .subscribe((customer: Customer) => {
        this.editCustomerForm.controls['username'].setValue(customer.username);
        this.editCustomerForm.controls['firstname'].setValue(
          customer.firstname
        );
        this.editCustomerForm.controls['lastname'].setValue(customer.lastname);
        this.editCustomerForm.controls['address'].setValue(customer.address);
        this.editCustomerForm.controls['phone'].setValue(customer.phone);
        this.editCustomerForm.controls['email'].setValue(customer.email);
      });
  }

  onSubmit() {

    this.customerService
      .updateCustomer(this.custUsername, this.editCustomerForm.value)
      .subscribe(
        (data) => {
          this.submitted = true;
          setTimeout(() => ((this.submitted = null), this.onCancel()), 1000);
        },
        (error) => {
          this.submitted = false;
          this.errorMessage = error;
        }
      );
  }

  onCancel() {
    this.router.navigate(['/customers']);
  }
}
