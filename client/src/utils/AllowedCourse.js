import getCourseFromPublic_id from './getCourseFromPublicId';

export default function AllowedCourse(public_id, courses) {
  const category = getCourseFromPublic_id(public_id);

  const ownedCategory = courses.filter((course) => course.course == category);

  if (ownedCategory.length === 0) {
    return false;
  }
  return true;
}
