import ErrorTemplate from "./ErrorTemplate";
import "../Style/PageUPS.scss";

export default function PageUPS() {
  return (
    <div className="ups-wrapper">
      <div className="ups-emoji">😅</div>
      <ErrorTemplate
        code="UPS!"
        title="Kažkas nepavyko..."
        message="Atrodo, mūsų puslapis trumpam pametė pusiausvyrą. Bandykite vėliau arba grįžkite į pradžią."
        color="#ffa726"
        hoverColor="#fb8c00"
      />
    </div>
  );
}
