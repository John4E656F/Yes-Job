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

export interface dashboardViewCounterDisplayType {
  totalViewCount24Hours: number;
  totalViewCount7Days: number;
  totalViewCount30Days: number;
}
