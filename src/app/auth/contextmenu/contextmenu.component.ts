import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.scss']
})
export class ContextmenuComponent implements OnInit {
 @Input() userData = [];
  @Input() x = 0;
  @Input() y = 0;
  @Input() userid=0;
  @Input() seasonname="";
  @Input() StartDate;
  @Input() EndDate;
  @Input() isShow: boolean;
  constructor(private readonly router:Router) { }

  ngOnInit() {
  }

  public onLock(event): void {



    const userId: number =this.userid;
    const seasonname :string =this.seasonname;
    const startdate: Date =this.StartDate;
    const enddate:Date = this.EndDate;
    this.router.navigate(['/season'], { queryParams: { userId ,seasonname,startdate,enddate} })

  
  }

  public onUnLock(e): void {
   
  }

}
