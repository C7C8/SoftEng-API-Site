import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteApiComponent } from './confirm-delete-api.component';

describe('ConfirmDeleteApiComponent', () => {
  let component: ConfirmDeleteApiComponent;
  let fixture: ComponentFixture<ConfirmDeleteApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
