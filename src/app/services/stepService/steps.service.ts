import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StepModel } from 'src/app/interfaces/steps';

const STEPS = [
  { stepIndex: 1, isComplete: false,stepName:'Product Meta Data' },
  { stepIndex: 2, isComplete: false,stepName:'Product Media' },
  { stepIndex: 3, isComplete: false, stepName:'Varient Info' },
  { stepIndex: 4, isComplete: false, stepName:'Sales/ Marketting Attributes' },
  { stepIndex: 5, isComplete: false, stepName:'Technical Details' },
  { stepIndex: 6, isComplete: true, stepName:'Summary Details' }
];

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  steps$: BehaviorSubject<StepModel[]> = new BehaviorSubject<StepModel[]>(STEPS);
  currentStep$: BehaviorSubject<StepModel|null> = new BehaviorSubject<StepModel | null>(null);
  
  constructor() {
    this.currentStep$.next(this.steps$.value[0]);
  }

  setCurrentStep(step: StepModel): void {
    this.currentStep$.next(step);
    
  }
  resetCurrentStep(){
    this.currentStep$.next(this.steps$.value[0]);
  }

  getCurrentStep(): Observable<StepModel|null> {
    return this.currentStep$.asObservable();
  }

  getSteps(): Observable<StepModel[]> {
    return this.steps$.asObservable();
  }

  moveToNextStep(): void {
    const index = this.currentStep$.value?.stepIndex;

    if (index! < this.steps$.value.length) {
      this.currentStep$.next(this.steps$.value[index!]);
    }
  }

  isLastStep(): boolean {
    console.log("this.currentStep$.value: ",this.currentStep$.value);
    console.log("this.steps$.value.length: ",this.steps$.value.length);
    return this.currentStep$.value?.stepIndex === this.steps$.value.length;
  }
}