import type { BaseFilterParams } from "../BaseFilterParams";

export interface ProductFilterItem {
  id: number;
  creationDate: string;
  title: string;
  imageName: string;
  slug: string;
}
export interface ProductFilterParams extends BaseFilterParams {
  title: string | undefined;
  slug: string | undefined;
  id: number | undefined;
}
