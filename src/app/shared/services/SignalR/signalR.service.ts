import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";  // or from "@microsoft/signalr" if you are using a new library
import { USE_STORE } from '@ngx-translate/core';
import { config } from 'rxjs';
import { Config } from 'src/app/Core/helpers/config.helper';
import {NotificationModel} from 'src/app/Notification/NotificationModel'

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public data: NotificationModel[];
private hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(Config.getServerUrl()+'/notifications')
                            .build();
                            debugger;
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      //this.data = data;
      this.broadcastChartData()
    });
  }
  public broadcastChartData = () => {
  
    this.hubConnection.invoke('broadcastchartdata', JSON.parse(localStorage.getItem("currentUser")).user.id)
    .then(()=>{
        this.addBroadcastChartDataListener()
    })
    .catch(err => console.error(err));
  }
  public addBroadcastChartDataListener = () => {
    this.hubConnection.on('broadcastchartdata', (data) => {
      this.data = data;
    })
  }
}