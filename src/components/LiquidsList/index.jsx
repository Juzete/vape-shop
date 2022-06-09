import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const dataList = [{ id: "1", name: "Jija", description: "jjjj" }];

const LiquidList = ({ setIsChecked }) => {
  const handleCheckbox = () => (e) => {
    if (e.target?.checked) {
      setIsChecked((prevState) => [...prevState, e.target.id]);
    } else {
      setIsChecked((prevState) =>
        prevState.filter((item) => item !== e.target.id)
      );
    }
  };

  const printList = () => {
    return dataList.map((item) => {
      return (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label={item.name}
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox onChange={handleCheckbox()} id={item.id} />}
              label={item.name.toUpperCase()}
            />
          </AccordionSummary>
          <AccordionDetails sx={{ fontFamily: "roboto" }}>
            {item.description}
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return <div>{printList()}</div>;
};

export default LiquidList;
