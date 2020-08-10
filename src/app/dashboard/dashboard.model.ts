
import { v4 as uuidv4 } from 'uuid';
import { QuestionnaireModel } from '../shared/models/questionnarie.model';

export interface InterviewModel {
    id: uuidv4;
    name: string;
    data: QuestionnaireModel[];
}
