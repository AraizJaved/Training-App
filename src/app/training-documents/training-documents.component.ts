import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-documents',
  templateUrl: './training-documents.component.html',
  styleUrls: ['./training-documents.component.scss']
})
export class TrainingDocumentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  openFile(fileName: string) {
    debugger
    window.open('assets/PDF/' + fileName);
  }

}
