import { Structure } from "./structure";

export interface Row {
  anatomical_structures: Structure[];
  cell_types: Structure[];
  biomarkers: Structure[];
}
