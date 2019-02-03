import React from 'react';
import ReactDOM from 'react-dom';

//t*8+8*s(t/(15&(t>>11)))
//(t*((3+(1^t>>10&5))*(5+(3&t>>14))))>>(t>>8&3*s(t/8))
//((((t/800|10)*t)&85)-t)&(t/4)

var library = [
  { name: 'Playful', f:'t*(((t>>9)^((t>>9)-1)^1)%t)', tags: []},
{ name: 'Pacing', f:'(t>>4)|(t%10)|(((t%101)|(t>>14))&((t>>7)|(t*t%17)))', tags: []},
{ name: 'Pacing', f:'t>>6&1&&t>>5||-t>>4', tags: []},
{ name: 'Sinister', f:'t|t%255|t%257', tags: []},
{ name: 'Sinister', f:'(t&t%255)-(t*3&t>>13&t>>6)', tags: []},
{ name: 'Sinister', f:'t&(s(t&t&3)*t>>5)/(t>>3&t>>6)', tags: []},
{ name: 'Sinister', f:'(t*(t>>8+t>>9)*100)+s(t)', tags: []},
{ name: 'Lead', f:'(t*((3+(1^t>>10&5))*(5+(3&t>>14))))>>(t>>8&3)', tags: []},
{ name: 'Lead', f:'t*(t^t+(t>>15|1)^(t-1280^t)>>10)', tags: []},
{ name: 'Noisy', f:'(t&t>>12)*(t>>4|t>>8)', tags: []},
{ name: 'Noisy', f:'t*((t>>12|t>>8)&63&t>>4)', tags: []},
{ name: 'Noisy', f:'(t&t>>12)*(t>>4|t>>8)^t>>6', tags: []},
{ name: 'Rising', f:'((t>>1%128)+20)*3*t>>14*t>>18 ', tags: []},
{ name: 'Beat', f:'(t|(t>>9|t>>7))*t&(t>>11|t>>9)', tags: []},
{ name: 'Beat', f:'((t*(-(t>>8|t|t>>9|t>>13)))^t)', tags: []},
{ name: 'Chill', f:'f=t*a((t+2048)/8192,1,1,1.5,2,1,1,1.5,0.8),(f%50.01+f%40.1+f%30.1+f%60.01)*(((t>>4)%256)/256)*0.75', tags: []},
{ name: 'Chill', f:'k=s(t*2)*a((t*4)/8192,1,1,0,0,0,2,0,0)*(1-(((t>>4)%256)/256))*0.75,\nv=a((t*4)/8192,0,0,1,0),v=v*v,\nf=t*a((t+2048)/8192,1,1,1.5,2,1,1,1.5,0.8),\n(f%50.01+f%40.1+f%30.1+f%60.01)*(((t>>4)%256)/256)*(1-(((t>>2)%256)/256)/2)*0.75\n+(r(1)%255)*(0.5-(((t>>3)%256)/256)/2)*v\n+k', tags: []},
{ name: 'MeloBeat', f: '(t>>7|t|t>>6)*10+4*(t&t>>13|t>>6)', tags: []},
{ name: 'Evolving melobeat', f:'t*(((t>>11)&(t>>8))&(123&(t>>3)))', tags: []},
{ name: 'Pacing', f: '(t>>6|t|t>>(t>>16))*10+((t>>11)&7)', tags: []},
{ name: 'Cheeky', f: 't*(t>>((t>>9)|(t>>8))&(63&(t>>4)))', tags: []},
{ name: 'Pacing Noisy', f:'(t>>(t&7))|(t<<(t&42))|(t>>7)|(t<<5)', tags: []},
{ name: 'Pacing Beat', f: '(t>>6|t<<1)+(t>>5|t<<3|t>>3)|t>>2|t<<1', tags: []},
{ name: 'Pacing Lead', f: '(((t*(t>>8|t>>9)&46&t>>8))^(t&t>>13|t>>6))*2', tags: []},
{ name: 'Lead', f: 't+(t&t^t>>6)-t*((t>>9)&(t%16&72||6)&t>>9)', tags: []},
{ name: 'Hardcore', f: 't*(t/256)-t*(t/255)+t*(t>>5|t>>6|t<<2&t>>1)', tags: []},
{ name: 'Melody', f: '(^t>>2)*((127&t*(7&t>>10))<(245&t*(2+(5&t>>14))))', tags: []},
{ name: 'Hardcore Broken', f: 't*(t>>8*((t>>15)|(t>>8))&(20|(t>>19)*5>>t|(t>>3)))', tags: []},
{ name: 'Playful Beat', f: 't*(t>>((t&4096)&&((t*t)/4096)||(t/4096)))|(t<<(t/256))|(t>>4)', tags: []},
{ name: 'Pacing Melody', f: 't>>6^t&37|t+(t^t>>11)-t*((t%24&&2||6)&t>>11)^t<<1&(t&598&&t>>4||t>>10) ', tags: []}
];

export default class Manual extends React.Component {
  constructor() {
    super();
    this.ellipsisWidth = 0;
    this.onresize = () => {
      this.width = this.refs.content.offsetWidth;
      this.height = this.refs.content.offsetHeight;
      this.ellipsisWidth = this.width * 0.9;
      console.log(this.width, this.height, this.ellipsisWidth);
      this.forceUpdate();
    }
  }
  componentDidMount() {
    this.onresize();
    window.addEventListener('resize', this.onresize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onresize);
  }
  handleClick(expr) {
    this.props.glitch.compile(expr);
    if (!this.props.glitch.player) {
      this.props.glitch.togglePlayback();
    }
  }
  handleAppend(expr) {
    this.props.glitch.compile(this.props.glitch.input+"\n&"+expr);
    if (!this.props.glitch.player) {
      this.props.glitch.togglePlayback();
    }
  }
  handleClipboard(expr) {
    this.props.glitch.compile(this.props.glitch.input+"\n&"+expr);
    if (!this.props.glitch.player) {
      this.props.glitch.togglePlayback();
    }
  }
  render() {
    var results = [];
    for (var i = 0; i < library.length; i++) {
      results.push(
    <p
        style={{
    	     width: this.ellipsisWidth + 'px',
    	  }}
        className={"librarylink " + (this.props.glitch.input == library[i].f ? 'current' : '')}>
      <a
      	onClick={this.handleClick.bind(this, library[i].f)}>
      	 &gt;&gt; {library[i].name || library[i].f}
      </a >
      &nbsp;&nbsp;&nbsp;
      <a
      	 onClick={this.handleAppend.bind(this, library[i].f)}>
          &lt;&lt;append&gt;&gt;
      </a >
      &nbsp;&nbsp;&nbsp;
      <a
        className = "btn"
        data-clipboard-text = {library[i].f} >
          &lt;&lt;clipboard&gt;&gt;
      </a >
    </p>)
    }
    return <div ref="content" className="monospace" style={{
      overflowY:'auto',
      flex: '1',
    }}><div style={{
      height: this.ellipsisWidth == 0 ? '0' : (this.height + 'px'),
    }}>{results}</div></div>
  }
}
