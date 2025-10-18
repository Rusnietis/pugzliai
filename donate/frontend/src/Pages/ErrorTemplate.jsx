import { Link } from 'react-router-dom';
import '../Style/ErrorTemplate.scss';

export default function ErrorTemplate({ code, title, message, color, hoverColor }) {
  // CSS kintamieji leis kiekvienam puslapiui turėti savo spalvą
  const style = {
    "--error-color": color || "#007bff",
    "--error-hover": hoverColor || "#0056b3",
  };

  return (
    <div className="error-container" style={style}>
      <div className="error-code">{code}</div>
      <h1 className="error-title">{title}</h1>
      <p className="error-message">{message}</p>
      <Link to="/" className="error-button">
        Grįžti į pradžią
      </Link>
    </div>
  );
}
