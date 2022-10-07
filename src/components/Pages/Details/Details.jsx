import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();

  return (
    <>
      <h2>Details</h2>
      <p>{id}</p>
    </>
  );
}

export default Details;
