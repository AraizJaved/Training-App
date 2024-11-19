import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-back-button',
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {

    @Input()
    public title: string

    @Output()
    public cb: EventEmitter<any> = new EventEmitter()

    constructor(
        private readonly router: Router
    ) {
        console.log(this.router.url)
    }

    ngOnInit() {
    }

    public onBack(): void {
        debugger
        if (this.router.url.startsWith('/sub-level')) {
            if (this.title === 'Vacancy Position of Administrative Post') {
                this.cb.emit()
                return
            }

            if (this.title === 'IRMNCH') {
                this.cb.emit()
                return
            }

            if (this.title === 'Prevention and Control of Non Communicable Diseases') {
                this.cb.emit()
                return
            }

            if (this.title === 'Punjab AIDS Control Program') {
                this.cb.emit()
                return
            }

            if (this.title === 'Hepatitis Control Program') {
                this.cb.emit()
                return
            }

            if (this.title === 'TB Control Program') {
                this.cb.emit()
                return
            }

            if (this.title === 'Procurements') {
                this.cb.emit()
                return
            }

            this.router.navigate(['/'])
        } else {
            window.history.back()
        }

    }
}
