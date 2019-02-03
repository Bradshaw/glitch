import React from 'react';
import ReactDOM from 'react-dom';

import Visualizer from './visualizer.jsx';
import Editor from './editor.jsx';
import Library from './library.jsx';
import Manual from './manual.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {mode: 'code'};
  }
  nav(mode) {
    this.setState({mode: mode});
  }
  togglePlayback() {
    this.props.glitch.togglePlayback();
    this.forceUpdate();
  }
  save() {
    this.props.glitch.save();
  }
  componentDidMount() {
    window.onhashchange = () => {
      if (this.props.glitch) {
	this.props.glitch.compile(decodeURIComponent(window.location.hash.substring(1)));
      }
      this.forceUpdate();
    };
  }
  render() {
    if (this.props.glitch) {
      return this.renderLayout();
    } else {
      return <p>Glitch failed to start</p>;
    }
  }
  renderLayout() {
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    var content;
    var content2;
    var playButton;

    if (this.state.mode == 'code') {
      content = <Editor glitch={this.props.glitch} style={{flex: '1'}}/>
    } else if (this.state.mode == 'lib') {
      content = <Library glitch={this.props.glitch} />
    } else {
      content = <Manual />
    }
    content2 = <Library glitch={this.props.glitch} />

    if (this.props.glitch.player) {
      playButton = <IconButton
	icon="fa-stop"
	active="true"
	onClick={this.togglePlayback.bind(this)}
      />
    } else {
      playButton = <IconButton
	icon="fa-play"
	active="true"
	onClick={this.togglePlayback.bind(this)}
      />
    }

    return <div className="content" style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{display: 'flex', flex: '1', flexDirection: 'column'}}>
	<Header glitch={this.props.glitch} />
    	<div style={{flex: '1', display: 'flex', height: '300px'}}>
    	  {content}
    	</div>
      <div style={{flex: '1', display: 'flex'}}>
        {content2}
    	</div>
      </div>
      <div style={{width:'72px', display: 'flex', flexDirection: 'column'}}>
	{playButton}
      </div>
    </div>
  }
}

class Header extends React.Component {
  render() {
    return <div style={{display: 'flex', flexDirection: 'row'}}>
      <h1 className="monospace" style={{height: '72px', lineHeight:'72px', fontSize: '18pt'}}>
	#glitch
      </h1>
      <Visualizer glitch={this.props.glitch} />
    </div>
  }
}

class IconButton extends React.Component {
  render() {
    return <div {...this.props}
      style={{
	height: '72px', lineHeight: '72px', textAlign: 'center', cursor: 'pointer',
	fontSize: '20pt',
	opacity: (this.props.active ? '1' : '0.4'),
      }}>
      <i className={"fa " + this.props.icon} style={{color: this.props.color}}></i>
  </div>
  }
}
