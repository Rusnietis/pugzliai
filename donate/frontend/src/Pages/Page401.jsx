import ErrorTemplate from "./ErrorTemplate";

export default function Page401() {
  return (
    <ErrorTemplate
      code="401"
      title="Neautorizuota prieiga"
      message="Norėdami pasiekti šį puslapį, turite būti prisijungę."
      color="#0d6efd"
      hoverColor="#0b5ed7"
    />
  );
}
