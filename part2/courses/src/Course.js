import React from 'react'

const Part = ({name, exercise}) => {
  return (
    <div>
      <p>
        {name} {exercise}
      </p>
    </div>
  )

}

const Header = ({course}) => {
  return (
    <div>
      <h2>{course}</h2>
    </div>
  )
}

const Content = ({parts}) => {
  return (
      parts.map(part => 
      <Part name={part.name} exercise={part.exercises} key={part.id} />
      )
  )

}

const Total = ({parts}) => {
  return (
    <div>
      <p><b>Number of exercises {parts.reduce((total, part) => total + part.exercises, 0)}</b></p>
    </div>
  )
}

const Course = ({course}) => { // Takes in course object as a prop
  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>
  )
}

export default Course