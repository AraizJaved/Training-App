export class MeetingDTO {
  


    id: number;
    title: string;
    description: string;
    externalParticipant: string;
    externalParticipantsMobileNo: string;
    startDateTime: string | null;
    endDateTime: string | null;
    attachment: string;
    recordStatus: boolean | null;
    createdBy: string | null;
    creationDate: string | null;
    updatedBy: string | null;
    updationDate: string | null;
   
    organizer: string;
    venue: string;
    isDeleted: boolean | null;
    meetingStatus: string;
    meetingStatusId: string="";
    meetingOrganizerId: string="";
    meetingVenue: string="";
meetingAttendVia:string;

}