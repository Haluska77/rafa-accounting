import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertingPaymentComponent } from './converting-payment.component';

describe('ConvertingPaymentComponent', () => {
  let component: ConvertingPaymentComponent;
  let fixture: ComponentFixture<ConvertingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertingPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvertingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
