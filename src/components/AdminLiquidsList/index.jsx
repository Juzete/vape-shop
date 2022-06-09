import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { openModal, setCurrentModalId } from "../../store/slices/liquidsSlice";
import { CostWrapper, EditButtonWrapper } from "./styles";

const AdminLiquidsList = ({ setIsChecked }) => {
  const dataList = useSelector((state) => state.liquid.liquidsList);
  const dispatch = useDispatch();

  useEffect(() => {}, [dataList]);

  const handleCheckbox = () => (e) => {
    if (e.target?.checked) {
      setIsChecked((prevState) => [...prevState, e.target.id]);
    } else {
      setIsChecked((prevState) =>
        prevState.filter((item) => item !== e.target.id)
      );
    }
  };

  const handleEditClick = () => (e) => {
    dispatch(openModal("edit"));
    dispatch(setCurrentModalId(e.target.id));
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
              aria-label={item.liquidName}
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox onChange={handleCheckbox()} id={item.id} />}
              label={item.liquidName.toUpperCase()}
            />
            <CostWrapper>{item.liquidCost} руб.</CostWrapper>
          </AccordionSummary>
          <AccordionDetails sx={{ fontFamily: "roboto" }}>
            {item.liquidDescription}
          </AccordionDetails>
          <EditButtonWrapper>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleEditClick()}
              id={item.id}
            >
              Edit
            </Button>
          </EditButtonWrapper>
        </Accordion>
      );
    });
  };

  return <div>{printList()}</div>;
};

export default AdminLiquidsList;
