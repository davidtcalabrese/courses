import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.actions
      .loadCourses()
      .catch(error => alert('Loading courses failed ' + error));
  }
  render() {
    return (
      <>
        <h2>Courses</h2>
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
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
  return { courses: state.courses };
}

/* 
let's us declare what actions to pass to component on props
mapDispatchToProps is optional param to connect()
* when mapDispatchToProps is omitted, component gets a dispatch prop
* injected automatically
*/
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
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

