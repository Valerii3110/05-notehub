import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import type { CreateNoteData } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  tag: Yup.mixed<'work' | 'personal' | 'study'>().oneOf(
    ['work', 'personal', 'study'],
    'Invalid tag',
  ),
});

const NoteForm: React.FC<NoteFormProps> = ({ onSuccess, onCancel }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteData) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess();
    },
  });

  const initialValues: CreateNoteData = {
    title: '',
    content: '',
    tag: 'work',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(values);
        resetForm();
      }}
    >
      <Form className={css.form}>
        <label className={css.formGroup}>
          Title:
          <Field type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </label>

        <label className={css.formGroup}>
          Content:
          <Field as="textarea" name="content" className={css.textarea} />
          <ErrorMessage name="content" component="span" className={css.error} />
        </label>

        <label className={css.formGroup}>
          Tag:
          <Field as="select" name="tag" className={css.select}>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </label>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save'}
          </button>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
