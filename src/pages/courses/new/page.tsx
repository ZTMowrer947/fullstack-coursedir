import { FormEventHandler, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSubmit } from 'react-router-dom';

import type { CourseUpsertData } from '@/lib/mutations/newCourse.ts';

export default function NewCoursePage() {
  const { register, trigger, clearErrors, getValues } = useForm<CourseUpsertData>();
  const [, setSubmitTimestamp] = useState(-1);
  const submit = useSubmit();

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      // Perform form validation
      const isValid = await trigger();
      event.preventDefault();

      // If validation succeeded, proceed with submission
      if (isValid) {
        clearErrors();
        setSubmitTimestamp(Date.now());

        // Send form data to action as JSON
        const data = getValues();

        submit(JSON.stringify(data), {
          method: 'post',
          encType: 'application/json',
        });
      }
    },
    [clearErrors, getValues, submit, trigger],
  );

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div>
        <input type="text" id="title" placeholder="Course title..." {...register('title')} />
        <textarea
          id="description"
          cols={30}
          rows={10}
          placeholder="Course description..."
          {...register('description')}
        ></textarea>
      </div>
      <div>
        <input type="text" id="estimatedTime" placeholder="### Hours" {...register('estimatedTime')} />
        <textarea
          id="materialsNeeded"
          cols={10}
          rows={10}
          placeholder="List materials..."
          {...register('materialsNeeded')}
        ></textarea>
      </div>
      <div>
        <button type="submit">Create Course</button>
        <Link to={'/courses'}>Cancel</Link>
      </div>
    </form>
  );
}
