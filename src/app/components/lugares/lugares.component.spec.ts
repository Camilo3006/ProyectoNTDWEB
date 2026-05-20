import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugaresComponent } from './lugares.component';

describe('LugaresComponent', () => {
  let component: LugaresComponent;
  let fixture: ComponentFixture<LugaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LugaresComponent]
    });
    fixture = TestBed.createComponent(LugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
