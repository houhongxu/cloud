import { QuestionnaireStepPlaceholder } from './questionnaire-step-placeholder';

type QuestionnaireStepCommitmentProps = Readonly<{
  onContinue?: () => void;
}>;

export const QuestionnaireStepCommitment = ({ onContinue }: QuestionnaireStepCommitmentProps) => {
  return (
    <QuestionnaireStepPlaceholder
      titleKey="questionnaireSteps.commitment"
      descriptionKey="questionnaireSteps.todoCommitment"
      primaryCtaKey="questionnaireSteps.ctaContinue"
      onPrimaryPress={onContinue}
    />
  );
};

