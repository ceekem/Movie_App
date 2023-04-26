import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsBannersComponent } from './items-banners.component';

describe('ItemsBannersComponent', () => {
  let component: ItemsBannersComponent;
  let fixture: ComponentFixture<ItemsBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsBannersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
