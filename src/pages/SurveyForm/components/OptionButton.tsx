import { Button } from "@mui/material";
import React from "react";

interface OptionButtonProps {
  key?: string;
  content: string;
  color: "primary" | "secondary";
  onClickHandler: () => void;
  dataAnswerId: string;
  ref:
    | ((instance: HTMLButtonElement | null) => void)
    | React.RefObject<HTMLButtonElement>
    | null
    | undefined;
}

const OptionButton: React.FC<OptionButtonProps> = (props) => {
  const { key, content, color, onClickHandler, dataAnswerId, ref } = props;

  return (
    <Button
      key={key}
      variant="outlined"
      //   color={buttons[`button${index + 1}`].pressed ? "secondary" : "primary"}
      color={color}
      //   onClick={() => handleOptionButtonClick(`button${index + 1}`)}
      onClick={onClickHandler}
      data-answerid={dataAnswerId}
      //   ref={(button) =>
      //     (buttonsRefs.current[`button${index + 1}` as keyof ButtonsRef] = button)
      //   }
      ref={ref}
    >
      {content}
    </Button>
  );
};

export default OptionButton;
