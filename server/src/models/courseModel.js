import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const courseSchema = new Schema({
  category: {
    type: 'string',
    required: [true, 'category is required'],
  },
  author: {
    type: 'string',
    required: [true, 'author is required'],
  },
  title: {
    type: 'string',
    required: [true, 'title is required'],
  },
  videoPublicId: {
    type: 'string',
    required: [true, 'videoPublicId is required'],
  },
  thumbnail_url: {
    type: 'string',
    required: [true, 'thumbnail_url is required'],
  },
});

const Course = model('Course', courseSchema);

export default Course;
