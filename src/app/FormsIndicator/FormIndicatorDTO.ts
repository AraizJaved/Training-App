export class FormIndicatorDTO {
    id: number;
    indicatorName: string;
    comments: boolean;
    indicatorCategory: string;
    type: string;
    formId: number;
    isrequired: boolean;
    havingSubIndicator: boolean;
    subIndicatorListDTOs: SubIndicatorListDTO[];
    optionList: OptionList[];
    optionListToRemove: OptionList[];
    subIndicatorDependency: string;
}

export class SubIndicatorListDTO {

    id: number;
    parentIndicatorId: number;
    inputType: string;
    comments: boolean;
    isrequired: YesNoDTO | boolean;
    optionList: OptionList[];
    subIndicatorDependency: string;
    indicatorName: string;
    optionListToRemove: OptionList[]
}


export class OptionList {
    id: number;
    parentIndicatorId: number;
    label: string;
    forSubindicator: boolean;
    forComments: boolean;
    inputType: string;
}

export class TypeDTO {
    id: number;
    name: string;
}

export class YesNoDTO {
    value: boolean;
    text: string;
}