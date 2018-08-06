import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit.VillageComponent } from './edit.village.component';

describe('Edit.VillageComponent', () => {
  let component: Edit.VillageComponent;
  let fixture: ComponentFixture<Edit.VillageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit.VillageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit.VillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
