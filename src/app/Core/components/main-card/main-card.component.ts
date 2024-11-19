import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-main-card',
    templateUrl: './main-card.component.html',
    styleUrls: ['./main-card.component.scss']
})
export class MainCardComponent implements OnInit {

    @Input()
    public imagePath: string
    @Input()
    public title: string
    @Input()
    public width: number
    @Input()
    public height: number

    constructor() { }

    ngOnInit(): void {
    }

}
