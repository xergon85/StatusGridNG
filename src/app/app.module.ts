import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditGridComponent } from './components/edit-grid/edit-grid.component';
import { ConfigurationListComponent } from './components/configuration-list/configuration-list.component';
import { GridCellComponent } from './components/grid-cell/grid-cell.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EditGridComponent,
    ConfigurationListComponent,
    GridCellComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
