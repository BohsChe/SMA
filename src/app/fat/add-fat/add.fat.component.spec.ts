import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFatComponent } from './add.fat.component';

describe('AddFatComponent', () => {
  let component: AddFatComponent;
  let fixture: ComponentFixture<AddFatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddFatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
