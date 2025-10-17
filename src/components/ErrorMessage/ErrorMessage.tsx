import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={css.error}>
      <p>{message || "ERROR 😢"}</p>
    </div>
  );
}
