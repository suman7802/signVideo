import {useContext} from 'react';
import {UploadContext} from '../contexts/Upload.context';
import {Spinner} from 'react-bootstrap';

export default function UploadForm() {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error('useUpload must be used within a UploadProvider');
  }

  const {
    title,
    category,
    uploading,
    handleSubmit,
    handleTitleChange,
    handleCourseChange,
    handleCategoryChange,
    handleThumbnailChange,
  } = context;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mb-4">Upload Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Course Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Course Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={category}
                onChange={handleCategoryChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="course">Course File</label>
              <input
                type="file"
                className="form-control-file"
                id="course"
                name="course"
                accept="Course/*"
                onChange={handleCourseChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="thumbnail">Thumbnail File</label>
              <input
                type="file"
                className="form-control-file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                onChange={handleThumbnailChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit {'  '}
              {uploading && <Spinner animation="border" size="sm" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
