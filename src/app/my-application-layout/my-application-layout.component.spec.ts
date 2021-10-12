import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApplicationLayoutComponent } from './my-application-layout.component';

describe('MyApplicationLayoutComponent', () => {
  let component: MyApplicationLayoutComponent;
  let fixture: ComponentFixture<MyApplicationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyApplicationLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApplicationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
