import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { HousingLocationInfo } from "../interfaces/housing-location-info";
import { HousingService } from "../services/housing.service";

@Component({
  selector: "app-details",
  templateUrl: "details.html",
  styleUrl: "details.css",
  imports: [ReactiveFormsModule],
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocationInfo | undefined;
  housingLocationId: number = -1;

  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    const param = this.route.snapshot.paramMap.get("id");
    this.housingLocationId = param ? Number(param) : -1;
    this.housingLocation = this.housingService.getHousingLocationById(
      this.housingLocationId,
    );
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? "",
    );
  }
}
