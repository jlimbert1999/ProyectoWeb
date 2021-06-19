import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarViajeComponent } from './seleccionar-viaje.component';

describe('SeleccionarViajeComponent', () => {
  let component: SeleccionarViajeComponent;
  let fixture: ComponentFixture<SeleccionarViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarViajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
