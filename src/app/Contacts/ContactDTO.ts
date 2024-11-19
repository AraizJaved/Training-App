export class ContactDTO {
   
        id: number | null;
        title: string;
        name: string;
        designation: string;
        department: string | null;
        recordStatus: boolean | null;
        createdBy: string;
        creationDate: string | null;
        updatedBy: string;
        updationDate: string | null;
        email: string;
        mobileNo: string;
        phoneNo: string;
        address: string;
        city: string;
        state: string;
        country: string;
        cNIC: string;
        gender: string;
        dateOfBirth: string | null;
        resourceOFContact: string;
        district: string;
        division: string;
        tehsil: string;
        attachment: File;

}