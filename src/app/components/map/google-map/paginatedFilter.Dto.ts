export class PaginatedFilterDTO{

    PageNumber :number = 1;
    TotalRecords :number
    Size:number = 10
    PageCount:number
    FromDate:string
    ToDate:string
    QueryString:string
}