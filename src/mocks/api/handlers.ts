import { HttpResponse, RequestHandler, StrictResponse, http } from 'msw';
import db from './db';
import { Course } from '../../entities/course';
import { User } from '../../entities/user';

const handlers: RequestHandler[] = [
  http.get('/api/courses', () => {
    // Get courses and map into previews
    const courses = db.course.findMany({}).map(({ id, title }) => ({ id, title }));

    return HttpResponse.json(courses);
  }),

  http.get('/api/courses/:id', ({ params }) => {
    const id = Number.parseInt(params.id.toString(), 10);

    const course = db.course.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    const mappedCourse: Course | null =
      course != null
        ? {
            id: course.id,
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            userId: course.author!.id,
            user: {
              firstName: course.author!.firstName,
              lastName: course.author!.lastName,
            },
          }
        : null;

    if (mappedCourse) {
      return HttpResponse.json<Course | { message: string }>(mappedCourse);
    } else {
      return HttpResponse.json({ message: 'not found' }, { status: 401 });
    }
  }),

  http.get('/api/user', ({ request }): StrictResponse<{ message: string } | User> => {
    const authHeader = request.headers.get('authorization');
    const hdrRegex = /^Basic (?<credentials>[A-Za-z0-9+/=]+)$/;

    // Ensure Basic auth is being used
    if (!authHeader?.startsWith('Basic')) {
      return HttpResponse.json(
        { message: 'Auth not provided' },
        {
          status: 401,
          headers: {
            'www-authenticate': 'Basic',
          },
        },
      );
    }

    const result = hdrRegex.exec(authHeader);

    // Ensure credentials exist within header
    if (!result?.groups?.credentials) {
      return HttpResponse.json(
        { message: 'Invalid auth type provided' },
        {
          status: 401,
          headers: {
            'www-authenticate': 'Basic',
          },
        },
      );
    }

    // Decode credentials
    const credStr = atob(result.groups.credentials);
    const credParts = credStr.split(':');

    // If credentials are not in proper format, return 401
    if (credParts.length < 2) {
      return HttpResponse.json(
        { message: 'Invalid credential format' },
        {
          status: 401,
          headers: {
            'www-authenticate': 'Basic',
          },
        },
      );
    }

    // Extract email and password from credentials
    const [emailAddress, ...rest] = credParts;
    const password = rest.join(':'); // To account for a password containing a colon

    // Attempt to find user with credentials
    const user = db.user.findFirst({
      where: {
        emailAddress: {
          equals: emailAddress,
        },
        password: {
          equals: password,
        },
      },
    });

    // If not found, return 401
    if (!user) {
      return HttpResponse.json({ message: 'Incorrect credentials ' }, { status: 401 });
    }

    // Extract only the desired properties of the user
    const userData: User = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
    };

    return HttpResponse.json(userData);
  }),
];

export default handlers;
