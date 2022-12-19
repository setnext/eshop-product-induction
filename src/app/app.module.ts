import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './services/authService/auth.service';
import { ConfigService } from './services/cofigServices/config.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { StepsComponent } from './steps/steps.component';
import { StepTemplateComponent } from './step-template/step-template.component';
import { FormPageComponent } from './form-page/form-page.component';
import { CompletePageComponent } from './complete-page/complete-page.component';
import { ProductWizardComponent } from './product-wizard/product-wizard.component';
import { ProductMetadataComponent } from './product-metadata/product-metadata.component';

export const configFactory = (configService: ConfigService) => {
  return () => configService.loadConfig();
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProductListComponent,
    HomeComponent,
    CreateProductComponent,
    CreateCategoryComponent,
    StepsComponent,
    StepTemplateComponent,
    FormPageComponent,
    CompletePageComponent,
    ProductWizardComponent,
    ProductMetadataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,{
    provide: APP_INITIALIZER,
    useFactory: configFactory,
    deps: [ConfigService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
