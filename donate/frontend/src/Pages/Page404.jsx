import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div style={container}>
      <h1>404 - Puslapis nerastas</h1>
      <p>Atrodo, šio puslapio nebėra arba jis perkeltas.</p>
      <Link to="/apie" style={button}>Grįžti į pradžią</Link>
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











// export default function Page404(){
//     return (
//         <div className="error-page">
//             <h1>404 Page not found</h1>
//             <a href="#home">Return Home</a>
//         </div>
//     );
// }