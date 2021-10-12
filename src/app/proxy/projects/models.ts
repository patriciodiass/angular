import type { FullAuditedEntityDto } from '@abp/ng.core';

export interface CreateProjectDto {
  name: string;
  description?: string;
  projectTypeId?: string;
  userIds: string[];
}

export interface ProjectDto extends FullAuditedEntityDto<string> {
  name?: string;
  description?: string;
  projectTypeId?: string;
  projectType?: string;
}

export interface UpdateProjectDto {
  name: string;
  description?: string;
  projectTypeId?: string;
  userIds: string[];
}
