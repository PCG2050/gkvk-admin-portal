import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnit } from './edit-unit';

describe('EditUnit', () => {
  let component: EditUnit;
  let fixture: ComponentFixture<EditUnit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUnit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUnit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
