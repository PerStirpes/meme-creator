import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import MemePhotosHolder from './MemePhotosHolder';

const NewMeme = (props) => (
  <div>
     <h2>Click on a photo to create a new meme</h2>
     <MemePhotosHolder/>
  </div>
)

export default withRouter(connect(null, null)(NewMeme))