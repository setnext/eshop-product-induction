import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StepModel } from '../interfaces/steps';
import { StepsService } from '../services/stepService/steps.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StepsComponent implements OnInit {

  steps!: Observable<StepModel[]>;
  currentStep: Observable<StepModel|null> | undefined;

  constructor(private stepsService: StepsService) { }

  ngOnInit(): void {
    this.steps = this.stepsService.getSteps();
    this.currentStep = this.stepsService.getCurrentStep();
  }

  onStepClick(step: StepModel) {
    this.stepsService.setCurrentStep(step);
  }
}