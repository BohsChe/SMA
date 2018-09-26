import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Collection.AgentComponent } from './collection.agent.component';

describe('Collection.AgentComponent', () => {
  let component: Collection.AgentComponent;
  let fixture: ComponentFixture<Collection.AgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Collection.AgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Collection.AgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
