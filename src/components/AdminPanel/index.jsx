import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AlertDialog from "../AlertDialog";
import { Title, Wrapper } from "./styles";
import AdminLiquidsList from "../AdminLiquidsList";
import { deleteLiquid, openAdminModal } from "../../store/slices/liquidsSlice";
import LiquidsModal from "../LiquidsModal";

const AdminPanel = () => {
  const auth = useAuth();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState([]);
  const dataList = useSelector((state) => state.liquid.liquidsList);

  useEffect(() => {
    if (!auth.isAuth) navigate("/login");
  }, []);

  const handleOpenAdminModal = () => dispatch(openAdminModal("set"));
  const handleDeleteLiquid = () => dispatch(deleteLiquid(isChecked));

  return (
    <Wrapper>
      <Title>
        <Typography variant="h2" color={"#1976d2"}>
          Liquid List
        </Typography>
      </Title>
      <div>
        <Button
          variant="contained"
          onClick={handleOpenAdminModal}
          sx={{ mr: 3 }}
        >
          Add liquid
        </Button>
        {dataList.length > 0 && isChecked.length > 0 ? (
          <AlertDialog handleDeleteLiquid={handleDeleteLiquid} />
        ) : null}
      </div>
      <LiquidsModal />
      <div style={{ width: "100%", marginTop: "20px" }}>
        <AdminLiquidsList setIsChecked={setIsChecked} />
      </div>
    </Wrapper>
  );
};

export default AdminPanel;
