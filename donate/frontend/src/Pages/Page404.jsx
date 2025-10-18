import ErrorTemplate from "./ErrorTemplate";

export default function Page404() {
  return (
    <ErrorTemplate
      code="404"
      title="Puslapis nerastas"
      message="Deja, toks puslapis neegzistuoja arba buvo perkeltas."
      color="#198754"
      hoverColor="#157347"
    />
  );
}
