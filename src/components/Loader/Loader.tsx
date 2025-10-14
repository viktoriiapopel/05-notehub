import css from "./Loader.module.css";

interface LoaderMessageProps {
  message?: string;
}

 export default function Loader ({message}:LoaderMessageProps)  {
    return (
        <p className={css.text}>{message || "Loading movies, please wait..." }</p>
    );
};


