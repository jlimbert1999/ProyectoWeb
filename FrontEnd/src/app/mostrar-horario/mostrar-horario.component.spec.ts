import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarHorarioComponent } from './mostrar-horario.component';

describe('MostrarHorarioComponent', () => {
  let component: MostrarHorarioComponent;
  let fixture: ComponentFixture<MostrarHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarHorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
