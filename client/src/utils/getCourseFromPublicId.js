export default function getCourseFromPublicId(public_id) {
  return public_id.split('/')[1];
}
