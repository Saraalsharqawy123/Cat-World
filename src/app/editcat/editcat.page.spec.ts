import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcatPage } from './editcat.page';

describe('EditcatPage', () => {
  let component: EditcatPage;
  let fixture: ComponentFixture<EditcatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
