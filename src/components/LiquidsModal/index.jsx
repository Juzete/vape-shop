import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { boxStyles, FieldWrapper } from "./styles";
import { Divider, FormLabel, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import {
  addLiquid,
  closeAdminModal,
  editLiquid,
} from "../../store/slices/liquidsSlice";

const LiquidsModal = () => {
  const initialValues = {
    liquidName: "",
    liquidDescription: "",
    liquidCost: "",
  };

  const modalIsOpen = useSelector((state) => state.liquid.modalIsOpen);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeAdminModal());
  const modalState = useSelector((state) => state.liquid.modalState);
  const currentModalId = useSelector((state) => state.liquid.currentModalId);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, actions) => {
      handleClose();
      if (modalState === "set") {
        dispatch(addLiquid({ id: uuidv4(), ...values }));
        actions.resetForm({
          values: initialValues,
        });
      } else if (modalState === "edit") {
        const setExistVal = () => {
          let temp = {};
          const { liquidCost, liquidDescription, liquidName } = values;
          if (liquidCost) temp = { ...temp, liquidCost };
          if (liquidDescription) temp = { ...temp, liquidDescription };
          if (liquidName) temp = { ...temp, liquidName };
          return temp;
        };
        const val = setExistVal();
        const result = {
          id: currentModalId,
          ...val,
        };
        dispatch(editLiquid(result));
        actions.resetForm({
          values: initialValues,
        });
      }
    },
  });

  return (
    <div>
      <Modal
        open={modalIsOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyles}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
            mb="20px"
          >
            {modalState === "edit" ? "EDIT" : "ADD"}
          </Typography>
          <Divider sx={{ mb: 5 }} />
          <form onSubmit={formik.handleSubmit}>
            <FieldWrapper>
              <FormLabel htmlFor="liquidName" sx={{ m: 0, p: 0 }}>
                Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              </FormLabel>
              <TextField
                id="liquidName"
                name="liquidName"
                label="Liquid Name"
                variant="outlined"
                value={formik.values.liquidName}
                onChange={formik.handleChange}
              />
            </FieldWrapper>
            <FieldWrapper>
              <div>
                <FormLabel htmlFor="liquidDescription">Description</FormLabel>
              </div>

              <div>
                <TextField
                  id="liquidDescription"
                  label="Liquid Description"
                  name="liquidDescription"
                  variant="outlined"
                  value={formik.values.liquidDescription}
                  onChange={formik.handleChange}
                />
              </div>
            </FieldWrapper>
            <FieldWrapper>
              <FormLabel htmlFor="liquidCost">
                Cost &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              </FormLabel>
              <TextField
                id="liquidCost"
                label="Liquid Cost"
                name="liquidCost"
                variant="outlined"
                value={formik.values.liquidCost}
                onChange={formik.handleChange}
              />
            </FieldWrapper>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ ml: 1 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default LiquidsModal;
