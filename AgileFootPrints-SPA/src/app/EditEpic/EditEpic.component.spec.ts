/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditEpicComponent } from './EditEpic.component';

describe('EditEpicComponent', () => {
  let component: EditEpicComponent;
  let fixture: ComponentFixture<EditEpicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEpicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
