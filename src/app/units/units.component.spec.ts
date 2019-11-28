import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitsComponent } from "./units.component";
import { testImports } from "../app.component.spec";
import { FormatPipe } from "../format.pipe";
import { MainService } from "../main.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("UnitsComponent", () => {
  let component: UnitsComponent;
  let fixture: ComponentFixture<UnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: testImports,
      declarations: [UnitsComponent, FormatPipe],
      providers: [MainService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});