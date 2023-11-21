export interface viewCounterDataType {
  id: string;
  item_id: string;
  view_count: number;
  viewed_at: Date;
}

export interface viewCounterResponseType {
  type: string;
  message: viewCounterDataType[];
  totalViewCount: number;
}
