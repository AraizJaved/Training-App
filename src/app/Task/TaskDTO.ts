export class TaskDTO {
    id: number;
    description: string;
    dueDate: string;
    assignTo: string;
    title: string;
    priority:string;
    designation: string;
    attachment: File;
    taskAssignees:[];
    taskCc: string;

}