import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-with-image',
  templateUrl: './register-with-image.component.html',
  styleUrls: ['./register-with-image.component.scss']
})
export class RegisterWithImageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  attachSlips(){

    this.router.navigate(['/authentication/register'],  )
  }
}
