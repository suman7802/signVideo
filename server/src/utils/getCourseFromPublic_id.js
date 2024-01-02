import customError from '../errors/customError.js';

export default function getCourseFromPublic_id(public_id) {
  const regex = /signVideo\/([^\/]+)/;
  const match = public_id.match(regex);
  if (match && match[1]) {
    return match[1];
  } else {
    return new customError('No matched course found', 400);
  }
}
