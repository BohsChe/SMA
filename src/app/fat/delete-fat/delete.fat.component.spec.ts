import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFatComponent } from './delete.fat.component';

describe('DeleteFatComponent', () => {
  let component: DeleteFatComponent;
  let fixture: ComponentFixture<DeleteFatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
