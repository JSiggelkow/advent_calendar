import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorAccessForbiddenComponent } from './door-access-forbidden.component';

describe('DoorAccessForbiddenComponent', () => {
  let component: DoorAccessForbiddenComponent;
  let fixture: ComponentFixture<DoorAccessForbiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoorAccessForbiddenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoorAccessForbiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
