import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
import toast from "react-hot-toast";

interface NoteFormProps {
  onClose: () => void;
  onSuccess: () => void; 
}

export default function NoteForm({ onClose, onSuccess }: NoteFormProps) {
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Min 3 characters")
      .required("Required field"),
    content: Yup.string().max(500, "Max 500 characters"),
    tag: Yup.mixed<"Todo" | "Work" | "Personal" | "Meeting" | "Shopping">()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
      .required("Required field"),
  });

  const handleSubmit = async (values: {
    title: string;
    content: string;
    tag: string;
  }) => {
    try {
      await createNote({
        title: values.title,
        content: values.content,
        tag: values.tag,
      });
      toast.success("The note has been created!");
      onSuccess();
      onClose();
    } catch {
      toast.error("Error creating note 😢");
    }
  };

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}











