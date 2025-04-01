import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const navigate = useNavigate();

  return (
    <>
      <p>Tasks</p>
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
