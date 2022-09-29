import { makeStyles } from "@material-ui/core";

interface StyleProps {
  selected: boolean;
}

const useSelectButtonStyles = makeStyles(() => ({
  selectbutton: ({ selected }: StyleProps) => ({
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
  }),
}));

export { useSelectButtonStyles };
