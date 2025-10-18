import ErrorTemplate from "./ErrorTemplate";

export default function Page503() {
  return (
    <ErrorTemplate
      code="503"
      title="Paslauga laikinai nepasiekiama"
      message="Mūsų serveris šiuo metu laikinai nepasiekiamas arba vyksta priežiūros darbai. Bandykite dar kartą po kelių minučių."
      color="#fd7e14"
      hoverColor="#e36b0a"
    />
  );
}
