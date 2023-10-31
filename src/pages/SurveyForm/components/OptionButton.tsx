import { Button } from "@mui/material";
import React from "react";

interface OptionButtonProps {
  content: string;
  color: "primary" | "secondary";
  onClickHandler: () => void;
  dataAnswerId: number;
  disabled: boolean;
  buttonRef:
    | ((instance: HTMLButtonElement | null) => void)
    | React.RefObject<HTMLButtonElement>
    | null
    | undefined;
}

export const OptionButton: React.FC<OptionButtonProps> = (props) => {
  const { content, color, onClickHandler, dataAnswerId, disabled, buttonRef } =
    props;

  return (
    <Button
      variant="outlined"
      color={color}
      onClick={onClickHandler}
      data-answerid={dataAnswerId}
      disabled={disabled}
      ref={buttonRef}
    >
      {content}
    </Button>
  );
};
