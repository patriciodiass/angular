import type { FullAuditedEntityDto } from '@abp/ng.core';

export interface CreateProjectTypeDto {
  type?: string;
  color?: string;
}

export interface ProjectTypeDto extends FullAuditedEntityDto<string> {
  type?: string;
  color?: string;
}

export interface UpdateProjectTypeDto {
  type?: string;
  color?: string;
}
