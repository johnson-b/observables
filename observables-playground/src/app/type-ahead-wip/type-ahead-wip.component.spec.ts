import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAheadWipComponent } from './type-ahead-wip.component';

describe('TypeAheadWipComponent', () => {
  let component: TypeAheadWipComponent;
  let fixture: ComponentFixture<TypeAheadWipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeAheadWipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAheadWipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
