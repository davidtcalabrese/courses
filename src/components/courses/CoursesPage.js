import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };

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
      {this.state.redirectToAddCoursePage && <Redirect to="/course" /> }
        <h2>Courses</h2>
        <button
          style={{ marginBottom: 20 }}
          className='btn btn-primary add-course'
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
};

/*
determines what state is passed to component via props
be specific as possible about what state you expose to components
if you expose entire store, component will rerender when any data changes

mapStateToProps takes two args: 
  state - app state
  ownProps - lets you access props being attached to components
  it is optional, can be left out
*/
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId)
                .name,
            };
          }),
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

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

