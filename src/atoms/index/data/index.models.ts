export interface MessageCreationRequest {
  message: string;
  typingPattern0?: string;
  typingPattern1?: string;
  typingPattern2?: string;
}

export interface DailyReport {
  timestamp: Date;
  userId: string;
  message: string;
  score?: number;
  confidence?: number;
  netScore?: number;
  comparedPatterns?: number;
}
