import React from 'react';
import ReactDOM from 'react-dom';

var library = [
  {f: 't', tags: []},
  {f: 't&t>>8', tags: []},
  {f: 't*(42&t>>10)', tags: []},
  {f: 't|t%255|t%257', tags: []},
  {f: 't*(t>>9|t>>13)&16', tags: []},
  {f: 't>>6&1&&t>>5||-t>>4', tags: []},
  {f: '(t&t>>12)*(t>>4|t>>8)', tags: []},
  {f: '(t*5&t>>7)|(t*3&t>>10)', tags: []},
  {f: '(t*(t>>5|t>>8))>>(t>>16)', tags: []},
  {f: '(t>>13|t%24)&(t>>7|t%19)', tags: []},
  {f: 't*((t>>12|t>>8)&63&t>>4)', tags: []},
  {f: 't*5&(t>>7)|t*3&(t*4>>10)', tags: []},
  {f: '(t*((t>>9|t>>13)&15))&129', tags: []},
  {f: '(t&t%255)-(t*3&t>>13&t>>6)', tags: []},
  {f: '(t&t>>12)*(t>>4|t>>8)^t>>6', tags: []},
  {f: 't*(((t>>9)^((t>>9)-1)^1)%13)', tags: []},
  {f: 't*(51864>>(t>>9&14)&15)|t>>8', tags: []},
  {f: '(^t/100|(t*3))^(t*3&(t>>5))&t', tags: []},
  {f: '(t/8)>>(t>>9)*t/((t>>14&3)+4)', tags: []},
  {f: 't&(s(t&t&3)*t>>5)/(t>>3&t>>6)', tags: []},
  {f: '((t>>1%128)+20)*3*t>>14*t>>18 ', tags: []},
  {f: '(t|(t>>9|t>>7))*t&(t>>11|t>>9)', tags: []},
  {f: '(t*(t>>8+t>>9)*100)+s(t)', tags: []}, // TODO
  {f: '(t*9&t>>4|t*5&t>>7|t*3&t/1024)-1', tags: []},
  {f: 't*(((t>>9)|(t>>13))&(25&(t>>6)))', tags: []},
  {f: 't*(t^t+(t>>15|1)^(t-1280^t)>>10)', tags: []},
  {f: '(t>>7|t|t>>6)*10+4*(t&t>>13|t>>6)', tags: []},
  {f: 't*(((t>>11)&(t>>8))&(123&(t>>3)))', tags: []},
  {f: '(t>>6|t|t>>(t>>16))*10+((t>>11)&7)', tags: []},
  {f: 't*(t>>((t>>9)|(t>>8))&(63&(t>>4)))', tags: []},
  {f: '(t>>1)*(3134381729>>(t>>13)&3)|t>>5', tags: []},
  {f: '(t>>(t&7))|(t<<(t&42))|(t>>7)|(t<<5)', tags: []},
  {f: '(t>>4)*(13&(2291706249>>(t>>11&30)))', tags: []},
  {f: '(t>>7|t%45)&(t>>8|t%35)&(t>>11|t%20)', tags: []},
  {f: '(t>>6|t<<1)+(t>>5|t<<3|t>>3)|t>>2|t<<1', tags: []},
  {f: '((t*(t>>8|t>>9)&46&t>>8))^(t&t>>13|t>>6)', tags: []},
  {f: '(t>>5)|(t<<4)|((t&1023)^1981)|((t-67)>>4)', tags: []},
  {f: 't+(t&t^t>>6)-t*((t>>9)&(t%16&72||6)&t>>9)', tags: []},
  {f: 't>>4|t&(t>>5)/(t>>7-(t>>15)&-t>>7-(t>>15))', tags: []},
  //{f: 't*(1+"4451"[t>>13&3]/10)&t>>9+(t*0.003&3)', tags: []},
  {f: '((t>>5&t)-(t>>5)+(t>>5&t))+(t*((t>>14)&14))', tags: []},
  {f: 't*(t/256)-t*(t/255)+t*(t>>5|t>>6|t<<2&t>>1)', tags: []},
  {f: 't>>4|t&((t>>5)/(t>>7-(t>>15)&-t>>7-(t>>15)))', tags: []},
  {f: '(t*((3+(1^t>>10&5))*(5+(3&t>>14))))>>(t>>8&3)', tags: []},
  {f: '(^t>>2)*((127&t*(7&t>>10))<(245&t*(2+(5&t>>14))))', tags: []},
  {f: '(t+(t>>2)|(t>>5))+(t>>3)|((t>>13)|(t>>7)|(t>>11))', tags: []},
  {f: 't*(((t>>9)&10)|((t>>11)&24)^((t>>10)&15&(t>>15)))', tags: []},
  {f: 't*(t>>8*((t>>15)|(t>>8))&(20|(t>>19)*5>>t|(t>>3)))', tags: []},
  {f: '((t&((t>>23)))+(t|(t>>2)))&(t>>3)|(t>>5)&(t*(t>>7))', tags: []},
  {f: '(t>>4)|(t%10)|(((t%101)|(t>>14))&((t>>7)|(t*t%17)))', tags: []},
  {f: '((t&((t>>5)))+(t|((t>>7))))&(t>>6)|(t>>5)&(t*(t>>7))', tags: []},
  {f: '(((((t*((t>>9|t>>13)&15))&255/15)*9)%(1<<7))<<2)%6<<4', tags: []},
  {f: '((t%42)*(t>>4)|(357052961)-(t>>4))/(t>>16)^(t|(t>>4))', tags: []},
  {f: '(t/10000000*t*t+t)%127|t>>4|t>>5|t%127+(t>>16)|t', tags: []}, // TODO?
  {f: 't*(t>>((t&4096)&&((t*t)/4096)||(t/4096)))|(t<<(t/256))|(t>>4)', tags: []},
  {f: 't*((3134974581>>((t>>12)&30)&3)*0.25*(372709>>((t>>16)&28)&3))', tags: []},
  {f: '((t&4096)&&((t*(t^t%255)|(t>>4))>>1)||(t>>3)|((t&8192)&&t<<2||t))', tags: []},
  {f: 't>>16|((t>>4)%16)|((t>>4)%192)|(t*t%64)|(t*t%96)|(t>>16)*(t|t>>5)', tags: []},
  {f: '((t&4096)&&((t*(t^t%255)|(t>>4))>>1)||((t>>3)|((t&8192)&&t<<2||t)))', tags: []},
  {f: '(t>>5)|(t>>4)|((t%42)*(t>>4)|(357052691)-(t>>4))/(t>>16)^(t|(t>>4))', tags: []},
  {f: '((-t&4095)*(255&t*(t&(t>>13)))>>12)+(127&t*(234&t>>8&t>>3)>>(3&t>>14))', tags: []},
  {f: '(t*t/256)&(t>>((t/1024)%16))^t%64*(828188282217>>(t>>9&30)&t%32)*t>>18', tags: []},
  {f: 't>>6^t&37|t+(t^t>>11)-t*((t%24&&2||6)&t>>11)^t<<1&(t&598&&t>>4||t>>10) ', tags: []},
  {f: '((t/2*(15&(591751328>>(t>>8&28))))|t/2>>(t>>11)^t>>12)+(t/16&t&24)', tags: []}, // TODO
  {f: '(t%25-(t>>2|t*15|t%227)-t>>3)|((t>>5)&(t<<5)*1663|(t>>3)%1544)/(t%17|t%2048)', tags: []},
  //{f: '((t*("36364689"[t>>13&7]&15))/12&128)+(((((t>>12)^(t>>12)-2)%11*t)/4|t>>13)&127)', tags: []},
  //{f: '(3e3/(y=t&16383)&1)*35 +(x=t*"6689"[t>>16&3]/24&127)*y/4e4 +((t>>8^t>>10|t>>14|x)&63)', tags: []},
  {f: '((1-(((t+10)>>((t>>9)&((t>>14))))&(t>>4&-2)))*2)*(((t>>10)^((t+((t>>6)&127))>>10))&1)*32+128', tags: []},
  {f: '((t>>4)*(13&(2291706249>>(t>>11&30)))&255)+((((t>>9|(t>>2)|t>>8)*10+4*((t>>2)&t>>15|t>>8))&255)>>1)', tags: []},
  //{f: '(t<<3)*[8/9,1,9/8,6/5,4/3,3/2,0][[0xd2d2c8,0xce4088,0xca32c8,0x8e4009][t>>14&3]>>(0x3dbe4688>>((t>>10&15)>9?18:t>>10&15)*3&7)*3&7]', tags: []},
  {f: '((t*(t>>12)&(201*t/100)&(199*t/100))&(t*(t>>14)&(t*301/100)&(t*399/100)))+((t*(t>>16)&(t*202/100)&(t*198/100))-(t*(t>>17)&(t*302/100)&(t*298/100)))', tags: []},
  //{f: 'SS=function(s,o,r,p){var c=s.charCodeAt((t>>r)%p);return c==32?0:31&t*Math.pow(2,c/12-o)},SS("0 0     7 7     037:<<",6,10,32) + (t&4096?SS("037",4,8,3)*(4096-(t&4095))>>12 : 0)', tags: []},
  //{f: 'w=t>>9,k=32,m=2048,a=1-t/m%1,d=(14*t*t^t)%m*a,y=[3,3,4.7,2][p=w/k&3]*t/4,h="IQNNNN!!]]!Q!IW]WQNN??!!W]WQNNN?".charCodeAt(w/2&15|p/3<<4)/33*t-t,s=y*.98%80+y%80+(w>>7&&a*((5*t%m*a&128)*(0x53232323>>w/4&1)+(d&127)*(0xa444c444>>w/4&1)*1.5+(d*w&1)+(h%k+h*1.99%k+h*.49%k+h*.97%k-64)*(4-a-a))),s*s>>14?127:s', tags: []},
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
  render() {
    var results = [];
    for (var i = 0; i < library.length; i++) {
      results.push(<a
	onClick={this.handleClick.bind(this, library[i].f)}
	className={"librarylink " + (this.props.glitch.input == library[i].f ? 'current' : '')}
	style={{
	  width: this.ellipsisWidth + 'px',
	}}>
	&gt;&gt; {library[i].f}
      </a>)
    }
    return <div ref="content" className="monospace" style={{
      overflowY:'auto',
      flex: '1',
    }}><div style={{
      height: this.ellipsisWidth == 0 ? '0' : (this.height + 'px'),
    }}>{results}</div></div>
  }
}
