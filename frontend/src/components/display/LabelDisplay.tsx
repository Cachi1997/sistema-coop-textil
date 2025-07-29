type LabelDisplayProps = {
  message: string;
  className?: string;
};

export const LabelDisplay = ({ message, className }: LabelDisplayProps) => {
  return <label className={className}>{message}</label>;
};
