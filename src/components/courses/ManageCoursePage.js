import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as loadAuthors from '../../redux/actions/courseActions';
import * as loadCourses from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';

function ManageCoursePage({ courses, authors, loadAuthors, loadCourses }) {
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => alert('Loading courses failed ' + error));
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => alert('Loading authors failed ' + error));
    }
  }, []);

  return (
    <>
      <h2>Manage Course</h2>
    </>
  );
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

// using obj form of mapDispatchToProps simplifies code
// each prop automatically wrapped in call to dispatch
function mapStateToProps(state) {
  return {
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
