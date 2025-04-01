import { useNavigate } from "react-router-dom";

export default function Notes() {
    const navigate = useNavigate();
  return (
    <>
      <p>Notes</p>
      <button
        onClick={() => {
          navigate(-1);
        }}
        type="submit"
      >
        Back
      </button>
    </>
  );
}
