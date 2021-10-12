import type { FullAuditedEntityDto } from '@abp/ng.core';

export interface CreateImportDto {
  listOfDays: string[];
  projectId?: string;
  hoursSpent: number;
  exterior: boolean;
  training: boolean;
  observations?: string;
  userId?: string;
  isClosed: boolean;
}

export interface ImportDto extends FullAuditedEntityDto<string> {
  listOfDays: string[];
  projectId?: string;
  projectName?: string;
  projectDescription?: string;
  hoursSpent: number;
  exterior: boolean;
  training: boolean;
  observations?: string;
  isClosed: boolean;
}

export interface UpdateImportDto {
  listOfDays: string[];
  projectId?: string;
  hoursSpent: number;
  exterior: boolean;
  training: boolean;
  observations?: string;
  isClosed: boolean;
}
