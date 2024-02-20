import { object, ObjectSchema, string } from 'yup';

import type { Course } from '@/entities/course.ts';

export type CourseUpsertData = Pick<Course, 'title' | 'description' | 'estimatedTime' | 'materialsNeeded'>;

export const courseSchema: ObjectSchema<CourseUpsertData> = object({
  title: string().defined().required(),
  description: string().defined().required(),
  estimatedTime: string().nullable().defined(),
  materialsNeeded: string().nullable().defined(),
});
