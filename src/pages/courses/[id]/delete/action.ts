import { QueryClient } from '@tanstack/react-query';
import { ActionFunction, redirect } from 'react-router-dom';

import { User } from '@/entities/user.ts';
import { AuthManager } from '@/lib/auth-manager.ts';
import deleteCourse from '@/lib/mutations/delete-course';
import { courseDetailQuery } from '@/lib/queries/courseDetail.ts';

const courseDeleteAction = (queryClient: QueryClient, user: User): ActionFunction => {
  return async ({ request, params }) => {
    const data = await request.json();

    const idNum = params.id ? Number.parseInt(params.id, 10) : undefined;

    // Throw 400
    if (!idNum || Number.isNaN(idNum)) {
      throw new Response('Invalid ID', { status: 400 });
    }

    const query = courseDetailQuery(idNum);
    const result = await queryClient.ensureQueryData(query);

    // If course is not found, throw 404
    if (!result) throw new Response(`No course with ID "${idNum}"`, { status: 404 });

    // If course does not belong to user, throw 403
    if (result.userId !== user.id) throw new Response(`Not authorized to delete this course`, { status: 403 });

    if (data.title !== result.title) return { titlesMatch: false, timestamp: Date.now() };

    await deleteCourse(AuthManager.credentials!, idNum);

    return redirect('/courses');
  };
};

export default courseDeleteAction;
