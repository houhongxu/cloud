import { QuestionnaireStepPlaceholder } from './questionnaire-step-placeholder';

type QuestionnaireStepHarmProps = Readonly<{
  onContinue?: () => void;
}>;

export const QuestionnaireStepHarm = ({ onContinue }: QuestionnaireStepHarmProps) => {
  return (
    <QuestionnaireStepPlaceholder
      titleKey="questionnaireSteps.harm"
      descriptionKey="questionnaireSteps.todoHarm"
      primaryCtaKey="questionnaireSteps.ctaContinue"
      onPrimaryPress={onContinue}
    />
  );
};
