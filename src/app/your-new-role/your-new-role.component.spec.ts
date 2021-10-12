import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourNewRoleComponent } from './your-new-role.component';

describe('YourNewRoleComponent', () => {
  let component: YourNewRoleComponent;
  let fixture: ComponentFixture<YourNewRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourNewRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourNewRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
