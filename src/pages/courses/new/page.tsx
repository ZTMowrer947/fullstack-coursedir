import { yupResolver } from '@hookform/resolvers/yup';
import { FormEventHandler, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useActionData, useSubmit } from 'react-router-dom';

import { courseSchema, CourseUpsertData } from '@/lib/mutations/newCourse.ts';
import addServerErrors from '@/lib/server-validation/add-server-errors.ts';
import { NewCourseActionResult } from '@/pages/courses/new/action.ts';

export default function NewCoursePage() {
  const {
    register,
    trigger,
    clearErrors,
    getValues,
    setError,
    formState: { errors },
  } = useForm<CourseUpsertData>({
    resolver: yupResolver(courseSchema),
  });
  const [submitTimestamp, setSubmitTimestamp] = useState(-1);
  const submit = useSubmit();
  const actionResult = useActionData() as NewCourseActionResult | undefined;

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

  useEffect(() => {
    if (!actionResult || actionResult instanceof Response) return;

    if (actionResult.timestamp > submitTimestamp) {
      addServerErrors(actionResult.err, setError);
    }
  }, [actionResult, setError, submitTimestamp]);

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div>
        <div>
          <input
            type="text"
            id="title"
            placeholder="Course title..."
            aria-invalid={!!errors.title}
            {...register('title')}
          />
          {errors.title && <p role="alert">{errors.title.message}</p>}
        </div>
        <div>
          <textarea
            id="description"
            cols={30}
            rows={10}
            placeholder="Course description..."
            aria-invalid={!!errors.description}
            {...register('description')}
          ></textarea>
          {errors.description && <p role="alert">{errors.description.message}</p>}
        </div>
      </div>
      <div>
        <div>
          <input
            type="text"
            id="estimatedTime"
            placeholder="### Hours"
            aria-invalid={!!errors.estimatedTime}
            {...register('estimatedTime')}
          />
          {errors.estimatedTime && <p role="alert">{errors.estimatedTime.message}</p>}
        </div>
        <div>
          <textarea
            id="materialsNeeded"
            cols={10}
            rows={10}
            placeholder="List materials..."
            aria-invalid={!!errors.materialsNeeded}
            {...register('materialsNeeded')}
          ></textarea>
          {errors.materialsNeeded && <p role="alert">{errors.materialsNeeded.message}</p>}
        </div>
      </div>
      <div>
        <button type="submit">Create Course</button>
        <Link to={'/courses'}>Cancel</Link>
      </div>
    </form>
  );
}