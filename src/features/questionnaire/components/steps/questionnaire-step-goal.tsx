import { QuestionnaireStepPlaceholder } from './questionnaire-step-placeholder';

type QuestionnaireStepGoalProps = Readonly<{
  onContinue?: () => void;
}>;

export const QuestionnaireStepGoal = ({ onContinue }: QuestionnaireStepGoalProps) => {
  return (
    <QuestionnaireStepPlaceholder
      titleKey="questionnaireSteps.goal"
      descriptionKey="questionnaireSteps.todoGoal"
      primaryCtaKey="questionnaireSteps.ctaContinue"
      onPrimaryPress={onContinue}
    />
  );
};
