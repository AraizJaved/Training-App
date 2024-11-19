export class DailyEngagementFilterDTO {
    
    userList: any=null;
    Priority: string="";
    Status: string="";
    startDate : string;
    endDate : string;
    recordStatus : boolean;
    ShowMyEvent: boolean;
    ShowMyDailyEngagement: boolean;
    dailyEngagementStatusId:number;
    dailyEngagementStatus:string="";

}