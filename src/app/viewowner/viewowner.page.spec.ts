import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewownerPage } from './viewowner.page';

describe('ViewownerPage', () => {
  let component: ViewownerPage;
  let fixture: ComponentFixture<ViewownerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewownerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewownerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
