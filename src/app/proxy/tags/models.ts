import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateTagDto {
  name?: string;
  id?: string;
}

export interface TagDto extends EntityDto<string> {
  name?: string;
}
