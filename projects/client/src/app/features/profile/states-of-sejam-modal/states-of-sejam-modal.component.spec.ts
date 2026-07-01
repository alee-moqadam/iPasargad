import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesOfSejamModalComponent } from './states-of-sejam-modal.component';

describe('StatesOfSejamModalComponent', () => {
  let component: StatesOfSejamModalComponent;
  let fixture: ComponentFixture<StatesOfSejamModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatesOfSejamModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatesOfSejamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
