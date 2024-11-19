import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/Core/helpers/config.helper';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { SignalRService } from 'src/app/shared/services/SignalR/signalR.service';
import { NotificationModel } from '../NotificationModel';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  private subs = new Subscription();

  constructor( public signalRService : SignalRService , private http :HttpClient , public registerService : RegisterService) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();   
    this.signalRService.addBroadcastChartDataListener();
    this.getNotifications();
  }
  ngOnChanges(changes) {
    console.log(changes);
  }
  getNotifications() {
    debugger
    this.subs.add(

      this.registerService.getNotifications().subscribe(
        (data) => {
          debugger
          if(data.isException==false) 
          this.signalRService.data = data.data;
          
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

  // private startHttpRequest = () => {
  //   this.http.get(Config.getServerUrl()+'/api/Notification/GetNotificationsList')
  //     .subscribe(res => {
  //       console.log(res);
  //     })
  // }

}
