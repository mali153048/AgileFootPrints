/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewEpicComponent } from './NewEpic.component';

describe('NewEpicComponent', () => {
  let component: NewEpicComponent;
  let fixture: ComponentFixture<NewEpicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEpicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
