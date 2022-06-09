import { Typography } from "@mui/material";
import { useState } from "react";
import LiquidList from "../LiquidsList";
import { Title, Wrapper } from "./styles";

const MainWindow = () => {
  const [isChecked, setIsChecked] = useState([]);

  return (
    <Wrapper>
      <Title>
        <Typography variant="h2" color={"#1976d2"}>
          Vape Shop
        </Typography>
      </Title>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <LiquidList setIsChecked={setIsChecked} />
      </div>
    </Wrapper>
  );
};

export default MainWindow;
