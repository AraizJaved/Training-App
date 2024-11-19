import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-total-marks',
  templateUrl: './total-marks.component.html',
  styleUrls: ['./total-marks.component.scss']
})
export class TotalMarksComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }
  title: string = '';
  public value;

  CloseModal() {
    this.modalService.dismissAll();
  }
  saveTM(){
    localStorage.setItem('TM',this.value);
    this.passEntry.emit(this.value);
    this.CloseModal();
  }

}
