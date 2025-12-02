import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeclasComponent } from './teclas.component';

describe('TeclasComponent', () => {
  let component: TeclasComponent;
  let fixture: ComponentFixture<TeclasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeclasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeclasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
