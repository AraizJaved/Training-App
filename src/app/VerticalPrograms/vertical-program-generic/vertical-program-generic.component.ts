import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-vertical-program-generic',
    templateUrl: './vertical-program-generic.component.html',
    styleUrls: ['./vertical-program-generic.component.scss']
})
export class VerticalProgramGenericComponent implements OnInit {

    public type: string
    public isDgKhan: boolean = false
    constructor(
        private readonly activatedRoute: ActivatedRoute
    ) {
        debugger
        this.type = this.activatedRoute.snapshot.queryParams.type
        this.isDgKhan = this.activatedRoute.snapshot.queryParams.dgKhan
    }

    ngOnInit(): void {

    }
}
