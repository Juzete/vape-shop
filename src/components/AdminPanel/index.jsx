import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminPanel = () => {
  const auth = useAuth();
  let navigate = useNavigate();
  const allData = useSelector((state) => state.liquid);

  useEffect(() => {
    console.log(allData);
    if (!auth.isAuth) navigate("/login");
  }, []);

  return <div>AdminPanel</div>;
};

export default AdminPanel;
