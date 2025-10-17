import { Link } from "react-router-dom";

export default function Page401() {
  return (
    <div style={container}>
      <h1>401 - Neautorizuota prieiga</h1>
      <p>Norėdami pasiekti šį puslapį, turite būti prisijungę.</p>
      <Link to="/login" style={button}>Prisijungti</Link>
    </div>
  );
}

const container = {
  textAlign: "center",
  marginTop: "100px",
  fontFamily: "Arial, sans-serif"
};
const button = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  textDecoration: "none",
  cursor: "pointer"
};