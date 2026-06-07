import { Component, inject, effect } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { HousingLocation } from "../housing-location/housing-location";
import { HousingLocationInfo } from "../interfaces/housing-location-info";
import { HousingService } from "../services/housing.service";

@Component({
  selector: "app-home",
  imports: [HousingLocation, ReactiveFormsModule],
  templateUrl: "home.html",
  styleUrl: "home.css",
})
export class Home {
  housingLocationService: HousingService = inject(HousingService);
  filteredHousingList: HousingLocationInfo[] = [];

  searchForm = new FormGroup({
    city: new FormControl(""),
  });

  constructor() {
    effect(() => {
      this.filteredHousingList =
        this.housingLocationService.housingLocationList();
    });
  }

  searchHouses() {
    this.housingLocationService.searchHouses({
      searchedBy: "city",
      city: this.searchForm.value.city,
    });
  }
}
