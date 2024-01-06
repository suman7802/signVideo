import {useContext} from 'react';
import {FeaturedCoursesContext} from '../contexts/FeaturedCourses.context';
import {AuthContext} from '../contexts/Auth.context';

export default function FeaturedCourses() {
  const context = useContext(FeaturedCoursesContext);
  const authContext = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a CourseProvider');
  }

  if (authContext === undefined) {
    throw new Error('useAuth must be used within a CourseProvider');
  }

  const {courses} = authContext;
  const {featuredCourses, handleFeaturedCourseClick, isLoading} = context;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Featured courses</h2>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row">
          {featuredCourses.map((course) => {
            const isCoursePresent = courses.some(
              (c) => c.course === course.category
            );
            return (
              <div key={course._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div
                  className="card"
                  onClick={() =>
                    handleFeaturedCourseClick(course.videoPublicId)
                  }>
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className={`card-img-top ${
                      isCoursePresent ? '' : 'grayscale'
                    }`}
                    style={{
                      cursor: 'pointer',
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                    }}
                  />
                  {!isCoursePresent && (
                    <div className="overlay">
                      <p>Buy Course</p>
                    </div>
                  )}
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
                      <h6 className="card-title text-center">
                        <strong>{course.category}</strong>
                        <br />
                        {course.title}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
