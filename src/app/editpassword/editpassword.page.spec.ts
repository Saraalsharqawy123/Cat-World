import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpasswordPage } from './editpassword.page';

describe('EditpasswordPage', () => {
  let component: EditpasswordPage;
  let fixture: ComponentFixture<EditpasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
