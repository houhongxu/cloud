import { QuestionnaireStepPlaceholder } from './questionnaire-step-placeholder';

type QuestionnaireStepSymptomProps = Readonly<{
  onContinue?: () => void;
}>;

export const QuestionnaireStepSymptom = ({ onContinue }: QuestionnaireStepSymptomProps) => {
  return (
    <QuestionnaireStepPlaceholder
      titleKey="questionnaireSteps.symptom"
      descriptionKey="questionnaireSteps.todoSymptom"
      primaryCtaKey="questionnaireSteps.ctaContinue"
      onPrimaryPress={onContinue}
    />
  );
};
