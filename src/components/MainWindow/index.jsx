import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  openUserModal,
  setCheckedPositions,
} from "../../store/slices/userSlice";
import LiquidList from "../LiquidsList";
import UserModal from "../UserModal";
import { Title, Wrapper } from "./styles";

const MainWindow = () => {
  const [isChecked, setIsChecked] = useState([]);
  const dispatch = useDispatch();

  const handleOpenAdminModal = () => dispatch(openUserModal());

  useEffect(() => {
    dispatch(setCheckedPositions(isChecked));
  }, [isChecked]);

  return (
    <Wrapper>
      <Title>
        <Typography variant="h2" color={"#1976d2"}>
          Vape Shop
        </Typography>
      </Title>
      {isChecked.length > 0 ? (
        <Button
          variant="contained"
          sx={{ mr: 3 }}
          onClick={handleOpenAdminModal}
        >
          Заказать
        </Button>
      ) : null}
      <div style={{ width: "100%", marginTop: "20px" }}>
        <Typography variant="h6" color={"#1976d2"}>
          Выберите интересующие вас позиции
        </Typography>
        <UserModal />
        <LiquidList setIsChecked={setIsChecked} />
      </div>
    </Wrapper>
  );
};

export default MainWindow;
