import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getMemePhotos } from './actions';
import MemePhoto from './MemePhoto';
import NewMemeForm from './NewMemeForm';

class MemePhotosHolder extends Component {

  componentWillMount() {
    this.props.getMemePhotos();
  }

  showNewMemeForm(key) {
    let curMemes = this.state.todos;
    curMemes[key].edit = true;
  }

  render() {

    let photos = [];
    
    if(this.props.memePhotos) {
      photos = this.props.memePhotos.filter((val, i) => i <= 30);

      photos = photos.map((photo, i) => {
        if(this.props.selectedPhoto) {
          if(photo.id === this.props.selectedPhoto.props.id) {
            return (
              <div key={i}>
                <div key={i}>
                  <MemePhoto
                    key={i}
                    url={photo.url}
                    id={photo.id}
                    name={photo.name}
                    width={photo.width}
                    height={photo.height}
                  />
                  <NewMemeForm 
                    id={photo.id}
                    key={i+100}
                  />
                </div>
              </div>
            )
          }
        }
        return (
          <div key={i}>
            <MemePhoto
              key={i}
              url={photo.url}
              id={photo.id}
              name={photo.name}
              width={photo.width}
              height={photo.height}
            />
          </div>
        )
      })
    }

    return (
      <div>
        {photos}
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    memePhotos: state.memePhotos,
    selectedPhoto: state.selectedPhoto
  };
}

export default withRouter(connect(mapStateToProps, { getMemePhotos })(MemePhotosHolder));
