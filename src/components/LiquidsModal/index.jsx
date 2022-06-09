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
import { addLiquid, closeModal } from "../../store/slices/liquidsSlice";

const LiquidsModal = () => {
  const initialValues = {
    liquidName: "",
    liquidDescription: "",
    liquidCost: 0,
  };

  const modalIsOpen = useSelector((state) => state.liquid.modalIsOpen);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, actions) => {
      handleClose();
      dispatch(addLiquid({ id: uuidv4(), ...values }));
      actions.resetForm({
        values: initialValues,
      });
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
            LIQUID INFO
          </Typography>
          <Divider sx={{ mb: 5 }} />
          <form onSubmit={formik.handleSubmit}>
            <FieldWrapper>
              <FormLabel htmlFor="liquidName">Liquid Name</FormLabel>
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
              <FormLabel htmlFor="liquidDescription">
                Liquid Description
              </FormLabel>
              <TextField
                id="liquidDescription"
                label="Liquid Description"
                name="liquidDescription"
                variant="outlined"
                value={formik.values.liquidDescription}
                onChange={formik.handleChange}
              />
            </FieldWrapper>
            <FieldWrapper>
              <FormLabel htmlFor="liquidCost">Liquid Cost</FormLabel>
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
              sx={{ ml: 38 }}
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
