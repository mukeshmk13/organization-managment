import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AppComponent } from './app.component';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './core/utils/material.module';
import { FormsModule} from '@angular/forms';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizationListComponent,
    AddOrganizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
