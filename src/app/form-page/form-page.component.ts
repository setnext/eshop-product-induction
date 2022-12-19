import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs';
import { StepsService } from '../services/stepService/steps.service';
import { Router } from '@angular/router';
import { StepModel } from '../interfaces/steps';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormPageComponent implements OnInit {
  currentStep: Observable<StepModel|null> | undefined;

  constructor(
    private stepsService: StepsService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentStep = this.stepsService.getCurrentStep();
  }

  onNextStep() {
    if (!this.stepsService.isLastStep()) {
      this.stepsService.moveToNextStep();
    } else {
      this.onSubmit();
    }
  }

  showButtonLabel() {
    return !this.stepsService.isLastStep() ? 'Continue' : 'Finish';
  }

  onSubmit(): void {
    this.router.navigate(['/complete']);
  }
}