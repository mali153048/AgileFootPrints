/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EpicComponent } from './Epic.component';

describe('EpicComponent', () => {
  let component: EpicComponent;
  let fixture: ComponentFixture<EpicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
