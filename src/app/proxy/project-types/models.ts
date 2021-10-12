import type { FullAuditedEntityDto } from '@abp/ng.core';

export interface CreateProjectTypeDto {
  type?: string;
}

export interface ProjectTypeDto extends FullAuditedEntityDto<string> {
  type?: string;
}

export interface UpdateProjectTypeDto {
  type?: string;
}
