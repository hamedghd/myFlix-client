import React from 'react';
export class MainView extends React.Component {
  // Movies state will hold the list of movies.
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'The Godfather', Description: 'desc1...', ImagePath: '...' },
        { _id: 2, Title: 'The Godfather: Part II', Description: 'desc2...', ImagePath: '...' },
        { _id: 3, Title: 'The Dark Knight', Description: 'desc3...', ImagePath: '...' }
      ]
    }
  }
  render() {
    return (
      <div className="main-view">
        <div>The Godfather</div>
        <div>The Godfather: Part II</div>
        <div>The Dark Knight</div>
      </div>

    );
  }
}
