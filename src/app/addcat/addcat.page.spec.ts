import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcatPage } from './addcat.page';

describe('AddcatPage', () => {
  let component: AddcatPage;
  let fixture: ComponentFixture<AddcatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
