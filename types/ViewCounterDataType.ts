export interface viewCounterDataType {
  id: string;
  item_id: string;
  view_count: number;
  viewed_at: Date;
}

export interface viewCounterResponseType {
  type: 'success' | 'error';
  message: viewCounterDataType[] | string;
  totalViewCount: number;
}
