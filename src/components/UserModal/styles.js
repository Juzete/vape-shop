import styled from "styled-components";

export const boxStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const FieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin: 10px;
`;
