import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  backgroundColour?: string;
  borderColour?: string;
  classes?: string;
  colour?: string;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  testId?: string;
  text: string;
  title?: string;
}

export const Button: FC<ButtonProps> = ({
  backgroundColour = "transparent",
  borderColour = "brand",
  classes = "",
  colour = "brand",
  disabled = false,
  onClick,
  testId = "",
  text,
  title = "",
}) => {
  const staticClasses = `border-2 border-solid disabled:hover:cursor-not-allowed disabled:opacity-25 lg:px-6 lg:py-4 px-4 py-2 rounded-[27px]`;

  return (
    <button
      className={`${staticClasses} bg-${backgroundColour} border-${borderColour} text-${colour} ${classes}`}
      data-testid={testId}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {text}
    </button>
  );
};
