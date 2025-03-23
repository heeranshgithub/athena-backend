export interface ReplicatePrediction {
  message: string | string[] | number | number[] | boolean | null;
  status: string;
  id: string;
  version: string;
  urls: {
    get: string;
    cancel: string;
  };
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  error: string | null;
  logs: string | null;
  metrics: Record<string, number> | null;
}
