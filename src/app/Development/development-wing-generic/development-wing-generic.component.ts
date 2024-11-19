import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-development-wing-generic',
    templateUrl: './development-wing-generic.component.html',
    styleUrls: ['./development-wing-generic.component.scss']
})
export class DevelopmentWingGenericComponent implements OnInit {

    public type: string

    constructor(
        private readonly activatedRoute: ActivatedRoute
    ) {
        this.type = this.activatedRoute.snapshot.queryParams.type
    }

    ngOnInit(): void {
    }

}
