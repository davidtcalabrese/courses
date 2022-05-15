import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => alert('Loading courses failed ' + error));
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => alert('Loading authors failed ' + error));
    }
  }, []);

  function handleChange(e) {
    // destructure necessary b/c avoids the e getting gc'd, so it's still
    // available within nested setCourse callback. w/o this destructure,
    // we get error "this synthetic event is reused for performance reasons"
    // b/c synthetic event is no longer defined in async fxn.
    // destructuring on first line allows us to retain local ref to the event
    const { name, value } = e.target;
    // you can pass obj or fxn to setState, passing fxn in this case
    // so i can safely set new state based on existing state
    setCourse(prevCourse => ({
      ...prevCourse,
      // using es6's computed property syntax
      // allows me to reference a prop with a variable
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

// using obj form of mapDispatchToProps simplifies code
// each prop automatically wrapped in call to dispatch
function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}

/* 
let's us declare what actions to pass to component on props
mapDispatchToProps is optional param to connect()
* when mapDispatchToProps is omitted, component gets a dispatch prop
* injected automatically
*/
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
};

// declare mapDispatchToProps as an object
// declare props for each action you want exposed
// ea prop expected to be an actionCreator function
// each prop is automatically bound to dispatch
// connect() will automatically go through and bind each actionCreator
// prop in a call to dispatch

// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse
// }

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
