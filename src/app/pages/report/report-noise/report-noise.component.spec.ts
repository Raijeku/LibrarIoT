import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNoiseComponent } from './report-noise.component';

describe('ReportNoiseComponent', () => {
  let component: ReportNoiseComponent;
  let fixture: ComponentFixture<ReportNoiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportNoiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNoiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
