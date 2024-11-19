export class FolderDTO {

     Id : number;
     Name  : string;
     Description  : string;
     FK_ParenId  : number;
     countFiles : number;
     countFolders : number;
     ParentFolder :ParentFolder ; 

}


export class ParentFolder {
    Id : number;
    Name  : string;
    Description  : string;
    FK_ParenId  : number;
    countFiles : number;
    countFolders : number;
   
}

