export interface QuestionType {
  _id?: string;
  question: string;
  options: string[];
  correct_answer: string;
}

export interface Questions {
  questions: QuestionType[];
  questionModelVisibility: boolean;
  confirmationModelVisibility: boolean;
  questionId?: string;
  question?: QuestionType;
}
