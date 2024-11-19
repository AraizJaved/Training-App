export class CommonPaginationModel {
    draw:              number;
    page:              number;
    pageSize:          number;
    totalRecords:      number;
    search:            string;
    sortBy:            string;
    sortByFieldName:   string;
    sortIndex:         number;
    showRevoked:       boolean;
    meetingAgendaId:   string;
    requestFromModule: string;
    pkcode:            string;
    geoLvl:            string;
    from:              Date;
    to:                Date;
    labId:             number;
    columns:           Column[];
    filters:           Filter[];
    sorts:             Sort[];
    divCode:           string;
    disCode:           string;
    tehCode:           string;
    ucCode:            string;
    supervisorCode:    string;
    dateFilter:        DateFilter;
    dsgCode:           string;
    sessionCode:       number;
    visitType:         string;
    isLab:             boolean;
    userId:            string;
  }
  
  export class Column {
    displayName: string;
    columnName:  string;
  }
  
  export class DateFilter {
    from: Date;
    to:   Date;
  }
  
  export class Filter {
    name:     string;
    value:    string;
    values:   string[];
    valueTo:  string;
    function: string;
    type:     string;
    format:   string;
    dateFrom: string;
    dateTo:   string;
    operator: string;
    isCustom: boolean;
  }
  
  export class Sort {
    name: string;
    sort: string;
    type: string;
  }
  