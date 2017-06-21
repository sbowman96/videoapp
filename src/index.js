const port = process.env.PORT || 8080;
import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoDetail from './components/video_detail';
import  VideoList from './components/video_list';
import  SearchBar from './components/search_bar';
const API_KEY = 'AIzaSyDOQaQzQQAVaFXzWKPqkCY9wg7WwN65BZ0';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    videos: [],
    selectedVideo: null
   };
  this.videoSearch('blockchain')
}

videoSearch(term) {
  YTSearch({key: API_KEY, term: term}, (videos) => {
    this.setState({
      videos: videos,
      selectedVideo: videos[0]
     });
  });
}
  render () {
    const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);
return (
<div>
Steves search
   <SearchBar onSearchTermChange={videoSearch}/>


      <VideoDetail video={this.state.selectedVideo}/>
     <VideoList
      onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
      videos={this.state.videos} />

  </div>
);
}
}

ReactDOM.render(<App />, document.querySelector('.container'));
