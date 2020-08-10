export interface QuestionnaireModel {
    sectionName: string;
    questionList: string[];
    accordion?: Accordion;
    isEnabled?: boolean;
    answerList?: string[];
}

interface Accordion {
    openAll: () => {};
    closeAll: () => {};
}

export interface QuestionnarieAnswerModel {
    answerlist: AnswerModel[];
    sectionName: string;
    accordion?: any;
}

export interface AnswerModel {
    answer: level_enum[];
    question: string;
}

export interface CandidateModel {
    interviewId: string;
    name: string;
    questionAnswerList: string;
}

export interface QuestionAnswerModel {
    sectionName?: string;
    results?: AnswerModel[];
}

export const LEVEL_CONSTANT_LIST = ['None', 'Aware of it', 'Worked around it', 'Done it', 'Can teach it'];

export enum level_enum {
    'None',
    'AwareOfIt',
    'WorkedAroundIt',
    'DoneIt',
    'CanTeachIt'
}

export interface DataStats {
    totalQuestions: number;
    totalSections: number;
    completedQuestions: number;
    completedSections: number;
}
