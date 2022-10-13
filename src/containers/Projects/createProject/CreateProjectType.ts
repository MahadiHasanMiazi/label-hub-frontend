export interface CreateProjectProps {
  show: boolean;
  setShow: any;
}
export interface ITags {
  name: string;
  task_id: number;
  short_form: string;
  category: string;
  description: string;
  id: number;
  created_at: string;
  updated_at: string;
}
export interface IAnnotaion {
  name: string;
  has_tag: boolean;
  data_format: number;
  multi_annotation_support: boolean;
  id: number;
  tags?: ITags[];
}
