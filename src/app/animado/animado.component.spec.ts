import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimadoComponent } from './animado.component';

describe('AnimadoComponent', () => {
  let component: AnimadoComponent;
  let fixture: ComponentFixture<AnimadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
