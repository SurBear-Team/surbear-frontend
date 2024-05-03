export interface SurveyQuestion {
  options: Array<{
    id: number;
    answer: string;
  }>;
  id: number;
  content: string;
  page: number;
  questionType: string;
  maxText?: number;
  surveyId: number;
  questionOrder?: number;
  required: boolean;
}

export interface SurveyData {
  surveyQuestion: SurveyQuestion;
  options: Array<{
    id: number;
    answer: string;
  }>;
}

export interface EditSurveyProps {
  initialData: {
    id: number;
    surveyId: number;
    type: string;
    title: string;
    page: number;
    order: number;
    count: number;
    required: boolean;
    options: Array<{
      id: number;
      answer: string;
    }>;
    choices?: string[];
  };
  onCancel: () => void;
  refetch: () => void;
  setEditIndex: (index: number | null) => void;
  currentPage: number;
}

export interface DialogState {
  open: boolean;
  title: string;
  text: string;
}
