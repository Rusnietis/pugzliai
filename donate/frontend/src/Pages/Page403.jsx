import ErrorTemplate from "./ErrorTemplate";

export default function Page403() {
  return (
    <ErrorTemplate
      code="403"
      title="Prieiga draudžiama"
      message="Neturite pakankamų teisių peržiūrėti šio turinio."
      color="#6c757d"
      hoverColor="#5c636a"
    />
  );
}
