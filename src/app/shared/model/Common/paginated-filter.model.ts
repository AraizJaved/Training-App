export class PaginatedFilterModel {
    pageNumber = 1;
    totalRecords = 0;
    size = 10;
    pageCount = 0;
    fromDate?: Date;
    toDate?: Date;
    queryString = "";
  }