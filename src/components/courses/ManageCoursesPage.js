import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class ManageCoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions
        .loadCourses()
        .catch(error => alert('Loading courses failed ' + error));
    }
    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch(error => alert('Loading authors failed ' + error));
    }
  }
  render() {
    return (
      <>
        <h2>Manage Course</h2>
      </>
    );
  }
}

ManageCoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
};

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
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}

// declare mapDispatchToProps as an object
// declare props for each action you want exposed
// ea prop expected to be an actionCreator function
// each prop is automatically bound to dispatch
// connect() will automatically go through and bind each actionCreator
// prop in a call to dispatch

// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse
// }

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);
