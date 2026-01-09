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
  logoutConfirmationModelVisibility: boolean;
  loginModelVisibility: boolean;
  signUpModalVisibility: boolean;
  generateLinkModelVisibility: boolean;
  generatedLinkId: string;
  testResultModelVisibility: boolean;
  deleteGeneratedQuizDataVisibility: boolean;
  questionId?: string;
  question?: QuestionType;
  questionNumber: number;
  testResultId: string;
}

export interface Admin {
  email: string;
  password: string;
}
