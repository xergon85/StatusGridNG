import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationListComponent } from './configuration-list.component';

describe('ConfigurationListComponent', () => {
  let component: ConfigurationListComponent;
  let fixture: ComponentFixture<ConfigurationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationListComponent],
    });
    fixture = TestBed.createComponent(ConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
