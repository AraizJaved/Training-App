import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { GoogleMapComponent } from './google-map/google-map.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    declarations: [GoogleMapComponent, LeafletMapComponent],
    exports: [
        GoogleMapComponent
    ],
    imports: [
        CommonModule,
        MapRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxDatatableModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBb4srgfxcxa5pDvA1ysuWsZ6cOJBOx4z0'
        }),
        LeafletModule.forRoot(),
        HttpClientModule
    ]
})
export class MapModule { }
