import { useSelectButtonStyles } from "./Styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

type Props = {
  children: string;

  selected: boolean;
  onClick: () => void;
};

export default function SelectSymbolButton({
  children,
  selected,
  onClick,
}: Props) {
  const classes: ClassNameMap<"selectbutton"> = useSelectButtonStyles({
    selected,
  });

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
}
