import {useContext} from 'react';
import {ClassCoursesContext} from '../contexts/ClassCourses.context';

export default function Class() {
  const context = useContext(ClassCoursesContext);

  if (context === undefined) {
    throw new Error(
      'classCoursesContext must be used within a classCoursesProvider'
    );
  }

  const {classCourses, handleClassCourseClick} = context;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Class courses</h2>
      <div className="row">
        {classCourses.map((course) => (
          <div key={course._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div
              className="card"
              onClick={() => handleClassCourseClick(course.videoPublicId)}>
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className={`card-img-top`}
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
              <div
                className="card-body"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '5px',
                }}>
                <div
                  className="card-body d-flex flex-column justify-content-center align-items-center"
                  style={{padding: '5px', height: '100%'}}>
                  <h6 className="card-title text-center">{course.title}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
