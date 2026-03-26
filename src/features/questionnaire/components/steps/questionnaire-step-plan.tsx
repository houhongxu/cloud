import { QuestionnaireStepPlaceholder } from './questionnaire-step-placeholder';

type QuestionnaireStepPlanProps = Readonly<{
  onContinue?: () => void;
}>;

export const QuestionnaireStepPlan = ({ onContinue }: QuestionnaireStepPlanProps) => {
  return (
    <QuestionnaireStepPlaceholder
      titleKey="questionnaireSteps.plan"
      descriptionKey="questionnaireSteps.todoPlan"
      primaryCtaKey="questionnaireSteps.ctaContinue"
      onPrimaryPress={onContinue}
    />
  );
};

