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
import { addOrder, closeUserModal } from "../../store/slices/userSlice";
import axios from "axios";

const UserModal = () => {
  const modalIsOpen = useSelector((state) => state.user.modalIsOpen);
  const dataList = useSelector((state) => state.liquid.liquidsList);
  const checkedPositions = useSelector((state) => state.user.checkedPositions);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeUserModal());

  const getLiquidsNameById = () => {
    return dataList
      .filter((item) => checkedPositions.includes(item.id))
      .map((item) => {
        return { name: item.liquidName, cost: item.liquidCost };
      });
  };

  const sendMessageTGBot = (values) => {
    let liquidsMsgList = "";
    const URI_API = `https://api.telegram.org/bot${process.env.REACT_APP_TELEGRAM_TOKEN}/sendMessage`;

    getLiquidsNameById().forEach(
      (item) => (liquidsMsgList += `${item.name} | ${item.cost}р. \n`)
    );

    let message = `<b>Заявка с сайта</b>\n Выбраные позиции:\n ${liquidsMsgList}`;

    if (values.userName) {
      message += `Имя: <b>${values.userName}</b> \n`;
    }
    if (values.userTelegram) {
      message += `Телеграм: <b>${values.userTelegram}</b> \n`;
    }
    if (values.userVk) {
      message += `Vk: <b>${values.userVk}</b>\n`;
    }
    if (values.userPhone) {
      message += `Телефон: <b>${values.userPhone}</b> \n`;
    }

    axios.post(URI_API, {
      chat_id: process.env.REACT_APP_TELEGRAM_CHAT_ID,
      parse_mode: "html",
      text: message,
    });
  };

  const initialValues = {
    userName: "",
    userTelegram: "",
    userVk: "",
    userPhone: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, actions) => {
      handleClose();
      dispatch(
        addOrder({ id: uuidv4(), positions: getLiquidsNameById(), ...values })
      );
      sendMessageTGBot(values);
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
            Контактные данные
          </Typography>
          <span style={{ color: "gray" }}>
            *укажите удобный для вас способ связи
          </span>
          <Divider sx={{ mb: 5, mt: 1 }} />
          <form onSubmit={formik.handleSubmit}>
            <FieldWrapper>
              <FormLabel htmlFor="userName" sx={{ m: 0, p: 0 }}>
                Имя &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              </FormLabel>
              <TextField
                id="userName"
                name="userName"
                label="Имя"
                variant="outlined"
                value={formik.values.userName}
                onChange={formik.handleChange}
              />
            </FieldWrapper>
            <FieldWrapper>
              <div>
                <FormLabel htmlFor="userTelegram">Telegram</FormLabel>
              </div>

              <div>
                <TextField
                  id="userTelegram"
                  label="Telegram"
                  name="userTelegram"
                  variant="outlined"
                  value={formik.values.userTelegram}
                  onChange={formik.handleChange}
                />
              </div>
            </FieldWrapper>
            <FieldWrapper>
              <div>
                <FormLabel htmlFor="userVk">Vk</FormLabel>
              </div>
              <div>
                <TextField
                  id="userVk"
                  label="Vk"
                  name="userVk"
                  variant="outlined"
                  value={formik.values.userVk}
                  onChange={formik.handleChange}
                />
              </div>
            </FieldWrapper>
            <FieldWrapper>
              <div>
                <FormLabel htmlFor="userVk">Телефон</FormLabel>
              </div>
              <div>
                <TextField
                  id="userPhone"
                  label="Phone number"
                  name="userPhone"
                  variant="outlined"
                  value={formik.values.userPhone}
                  onChange={formik.handleChange}
                />
              </div>
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

export default UserModal;
