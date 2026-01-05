
export interface LearningPath {
  starterActivity: string;
  executionPlan: string[];
  code?: string;
  howToRun: string;
  nextSteps: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  path?: LearningPath;
}
