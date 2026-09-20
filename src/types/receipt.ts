export type ReceiptType =
  | "music"
  | "purchase"
  | "place"
  | "photo"
  | "message"
  | "search"
  | "event"
  | "note";

export interface LifeReceipt {
  id: string;
  type: ReceiptType;
  timestamp: string;
  title: string;
  subtitle?: string;
  description?: string;

  amount?: number;
  currency?: string;

  artist?: string;
  album?: string;
  durationMs?: number;

  category?: string;
  subcategory?: string;
  paymentMode?: string;

  tags: string[];
}

export interface ReceiptConnection {
  sourceId: string;
  targetId: string;
  score: number;
  reasons: string[];
}

export interface LifeChapter {
  id: string;
  title: string;
  description: string;
  receiptIds: string[];
  startDate: string;
  endDate: string;
  dominantTypes: ReceiptType[];
}
