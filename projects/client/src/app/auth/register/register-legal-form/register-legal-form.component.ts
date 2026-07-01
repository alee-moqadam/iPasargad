import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimatedBackgroundComponent } from '@client/auth/animated-background/animated-background.component';
import { ToastService } from '@client/core/services/toast.service';
import { FundService, CustomerInfoModel, NgbDatepickerI18nPersian, NgbDatePersianDateToGregorian } from '@client/shared';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register-legal-form',
  standalone: true,
  imports: [AnimatedBackgroundComponent, ReactiveFormsModule, NgIf, NgFor, NgbDatepickerModule],
  templateUrl: './register-legal-form.component.html',
  styleUrl: './register-legal-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
  ],
})
export class RegisterLegalFormComponent implements OnInit {
  customerInfo = signal<CustomerInfoModel>(null);
  provinces = signal([])
  cities = signal([])
  banks = signal([])
  contactCities = signal([])
  accountTypes = signal([])
  submited = signal<boolean>(false);
  companyForm: FormGroup;
  maxPickerDate: NgbDateStruct;
  canDelete=false;

  constructor(private fb: FormBuilder, private fundService: FundService,
    private router: Router, private toastService: ToastService, private calendar: NgbCalendar) {
    this.maxPickerDate = calendar.getToday()
  }

  ngOnInit() {
    // Fetch provinces on initialization
    this.getProvinces().subscribe(provinces => this.provinces.set(provinces));
    this.getBanks().subscribe(banks => this.banks.set(banks));
    this.getAccountType().subscribe(accountTypes => this.accountTypes.set(accountTypes));
    this.companyForm = this.fb.group({
      personalInfo: this.fb.group({
        companyName: ['', Validators.required],
        nationalId: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        registerNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        registerProvince: ['', Validators.required],
        registerPlaceId: ['', Validators.required],
        registerationDate: ['', Validators.required],
        economicCode: ['', [Validators.required, Validators.pattern('[0-9]*')]]
      }),
      contactInfo: this.fb.group({
        mobile: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        postalCode: ['', Validators.required],
        // country: ['', Validators.required],
        cityId: ['', Validators.required],
        provinceId: ['', Validators.required],
        address: ['', Validators.required]
      }),
      bankAccounts: this.fb.array([this.createBankAccount()]),
      partyHolderInfo: this.fb.array([
        this.createPartyHolder({ type: 'Manager', positionType: 'Ceo' }),
        this.createPartyHolder({ type: 'Agent', positionType: 'Agent' })
      ])
    });
  }

  getProvinces(): Observable<any[]> {
    return this.fundService.getallProvince()
  }

  getCities(provinceId: string): Observable<any[]> {
    return this.fundService.getcitiesbyCodeid(provinceId);
  }
  getBanks(): Observable<any[]> {
    return this.fundService.getallbanknames();
  }
  getAccountType(): Observable<any[]> {
    return this.fundService.getAccountType();
  }

  onProvinceChange() {
    const selectedProvince = this.companyForm.get('personalInfo.registerProvince').value;

    this.getCities(selectedProvince).subscribe(cities => this.cities.set(cities));
  }

  onContractProvinceChange() {
    const selectedProvince = this.companyForm.get('contactInfo.provinceId').value;

    this.getCities(selectedProvince).subscribe(cities => this.contactCities.set(cities));
  }


  createBankAccount(): FormGroup {
    return this.fb.group({
      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      iban: ['', Validators.required],
      branchCode: ['', Validators.required],
      branchName: ['', Validators.required],
      bankId: ['', Validators.required],
      isDefault: [false]
    });
  }

  addBankAccount() {
    this.bankAccounts.push(this.createBankAccount());
    this.canDelete  = this.bankAccounts.length > 1;
  }

  removeBankAccount(index: number) {
    if (this.bankAccounts.length > 1) {
      this.bankAccounts.removeAt(index);
    }
    this.canDelete  = this.bankAccounts.length > 1;
  }

  onDefaultChange(index: number) {
    this.bankAccounts.controls.forEach((control, i) => {
      if (i !== index) {
        control.get('isDefault').setValue(false);
      }
    });
  }

  createPartyHolder(data: { type: string, positionType: string }): FormGroup {
    return this.fb.group({
      type: [data.type],
      holderType: [1],
      positionType: [data.positionType],
      isOwnerSignature: [true],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // postalCode: ['', Validators.required],
      // address: ['', Validators.required],
      personNationalId: ['', Validators.required]
    });
  }

  get bankAccounts(): FormArray {
    return this.companyForm.get('bankAccounts') as FormArray;
  }

  onSubmit() {
    this.submited.set(true)
    if (this.companyForm.valid) {
      const model = this.companyForm.value
      model.personalInfo.registerDate = '' + NgbDatePersianDateToGregorian(model.personalInfo.registerationDate)
      console.log('Form Submitted', this.companyForm.value);
      this.fundService.saveManualLegalCustomer(model).subscribe(data => {
        this.toastService.show("اطلاعات شرکت با موفقیت ثبت شد و پس از بررسی توسط ادمین امکان صدور و ابطال فراهم خواهد شد",
          { classname: 'bg-success text-light', delay: 10000 }
        )
        this.router.navigate(['/dashboard']);
      })

    }
    else {
      this.toastService.show("خطا در اطلاعات وارد شده. لطفا همه مقادیر را بررسی نمایید",
        { classname: 'bg-danger text-light', delay: 5000 }
      )
    }
  }
}


