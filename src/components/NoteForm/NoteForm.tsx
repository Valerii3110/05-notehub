// src/components/NoteForm/NoteForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCreateNote } from '../hooks/useNotes';
import type { NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const VALID_TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required('Title is required'),
  content: Yup.string().max(500),
  tag: Yup.mixed<NoteTag>().oneOf(VALID_TAGS).required('Tag is required'),
});

const NoteForm: React.FC<NoteFormProps> = ({ onSuccess, onCancel }) => {
  const createNoteMutation = useCreateNote();

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' as NoteTag }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await createNoteMutation.mutateAsync(values);
        resetForm();
        onSuccess?.();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              {VALID_TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" onClick={() => onCancel?.()} className={css.cancelButton}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className={css.submitButton}>
              Create Note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
