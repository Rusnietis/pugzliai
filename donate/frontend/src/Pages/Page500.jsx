import ErrorTemplate from "./ErrorTemplate";

export default function Page500() {
  return (
    <ErrorTemplate
      code="500"
      title="Serverio klaida"
      message="Įvyko nenumatyta klaida mūsų pusėje. Bandykite vėliau."
      color="#dc3545"
      hoverColor="#bb2d3b"
    />
  );
}
