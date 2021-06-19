import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosViajeroComponent } from './datos-viajero.component';

describe('DatosViajeroComponent', () => {
  let component: DatosViajeroComponent;
  let fixture: ComponentFixture<DatosViajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosViajeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosViajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
