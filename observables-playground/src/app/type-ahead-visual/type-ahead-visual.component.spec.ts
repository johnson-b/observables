import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAheadVisualComponent } from './type-ahead-visual.component';

describe('TypeAheadVisualComponent', () => {
  let component: TypeAheadVisualComponent;
  let fixture: ComponentFixture<TypeAheadVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeAheadVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAheadVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
