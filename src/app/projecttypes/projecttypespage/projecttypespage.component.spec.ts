import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecttypespageComponent } from './projecttypespage.component';

describe('ProjecttypespageComponent', () => {
  let component: ProjecttypespageComponent;
  let fixture: ComponentFixture<ProjecttypespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjecttypespageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjecttypespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
