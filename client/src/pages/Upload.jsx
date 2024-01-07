import {useState} from 'react';
import {useContext} from 'react';
import {Spinner} from 'react-bootstrap';
import {UploadContext} from '../contexts/Upload.context';

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

  const [courseAdded, setCourseAdded] = useState(false);
  const [thumbnailAdded, setThumbnailAdded] = useState(false);

  const handleCourseChangeWithState = (e) => {
    handleCourseChange(e);
    setCourseAdded(e.target.files.length > 0);
  };

  const handleThumbnailChangeWithState = (e) => {
    handleThumbnailChange(e);
    setThumbnailAdded(e.target.files.length > 0);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Upload Course</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded">
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                placeholder="Subject"
                value={category}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="form-group mb-3">
              <label
                htmlFor="course"
                className={`btn btn-block  w-100 ${
                  courseAdded ? 'btn-success' : 'btn-secondary'
                }`}>
                Course
              </label>
              <input
                type="file"
                className="form-control-file d-none"
                id="course"
                name="course"
                accept="video/*"
                onChange={handleCourseChangeWithState}
              />
            </div>
            <div className="form-group mb-3">
              <label
                htmlFor="thumbnail"
                className={`btn btn-block w-100 ${
                  thumbnailAdded ? 'btn-success' : 'btn-secondary'
                }`}>
                Thumbnail
              </label>
              <input
                type="file"
                className="form-control-file d-none"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                onChange={handleThumbnailChangeWithState}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block w-100">
              Submit {'  '}
              {uploading && <Spinner animation="border" size="sm" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
