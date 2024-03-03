import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useActionData, useLoaderData, useParams, useSubmit } from 'react-router-dom';

import { courseDetailQuery } from '@/lib/queries/courseDetail.ts';
import { CourseUpdateDeleteData } from '@/pages/courses/[id]/updel-loader.ts';

interface CourseDeleteFormData {
  title: string;
}

export default function ConfirmDelete() {
  const initialData = useLoaderData() as CourseUpdateDeleteData;
  const { id } = useParams();
  const query = useQuery({
    ...courseDetailQuery(Number.parseInt(id!.toString(), 10)),
    initialData,
  });

  const [submitTimestamp, setSubmitTimestamp] = useState(-Infinity);
  const actionResult = useActionData() as { titlesMatch: boolean; timestamp: number } | null;
  const submit = useSubmit();
  const { register, handleSubmit } = useForm<CourseDeleteFormData>();

  const submitHandler = useCallback(
    (data: CourseDeleteFormData) => {
      setSubmitTimestamp(Date.now());

      submit(JSON.stringify(data), {
        method: 'post',
        encType: 'application/json',
      });
    },
    [setSubmitTimestamp, submit],
  );

  return (
    <form method="POST" onSubmit={handleSubmit(submitHandler)}>
      <h1>WARNING!</h1>
      <p>
        Proceeding shall <strong>permanently</strong> delete the &quot;{query.data?.title}&quot; course. Please type the
        course title below to proceed.
      </p>

      <input
        type="text"
        id="title"
        placeholder="Confirm Title..."
        aria-invalid={!!actionResult && actionResult.titlesMatch}
        {...register('title')}
      />
      {actionResult && !actionResult.titlesMatch && actionResult.timestamp > submitTimestamp && (
        <p role="alert">Titles do not match</p>
      )}
      <div>
        <button type="submit">DELETE course</button>
        <Link to="..">Cancel</Link>
      </div>
    </form>
  );
}
