import expr from './expr';

var FUNCS = {
  's': function(a) {
    if (a) {
      return Math.sin(a()*Math.PI/128)*127+128;
    } else {
      return 0;
    }
  },
  'g': function(a,off){
    if (a){
      console.log(off);
      var off = off() || 0;
      var amt = 0xFFF*2;
      var o = (amt/4)*off;
      return (((a()+o)/(0xFFF*2))%2>1?255:0);
    } else {
      return 0;
    }
  },
  'r': function() {
    return Math.random()*255;
  },
  'l': function(a) {
    if (a) {
      return Math.log2(a());
    } else {
      return 0;
    }
  },
  'a': function() {
    var len = arguments.length - 1;
    if (len < 2) {
      return 0;
    } else {
      var i = (Math.floor(arguments[0]()) + len) % len;
      i = (i + len) % len;
      return arguments[i+1]();
    }
  },
}

export default class Glitch {
  constructor() {
    var bufsz = 2*4096;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audio = new AudioContext();
    this.sampleRate = this.audio.sampleRate;
    this.sampleStep = 8000.0 / this.sampleRate;

    this.analyser = this.audio.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0;
    var len = this.analyser.frequencyBinCount;
    this.analyserFreq = new Uint8Array(len);
    this.analyserTime = new Uint8Array(len);
    this.renderNode = this.audio.createScriptProcessor(bufsz, 0, 1);
    this.renderNode.onaudioprocess = (e) => {
      this.analyser.getByteFrequencyData(this.analyserFreq);
      this.analyser.getByteTimeDomainData(this.analyserTime);
    }
    this.renderNode.connect(this.audio.destination);
    this.analyser.connect(this.renderNode);
    this.analyser.connect(this.audio.destination);

    this.pcmNode = this.audio.createScriptProcessor(bufsz, 0, 1);
    this.pcmNode.onaudioprocess = (e) => {
      if (!this.player) {
        return;
      }
      var out = e.outputBuffer.getChannelData(0);
      for (var i = 0; i < out.length; i++) {
        var v = this.player();
        out[i] = (v&0xff)/0x80 - 1;
        this.vars.r(this.vars.r()+1);
        this.vars.t(Math.round(this.vars.r()*this.sampleStep));
      }
    }

    this.delay = this.audio.createDelay(0.5);
    this.delay.connect(this.renderNode);
    this.delay.value = 0;

    this.lp = this.audio.createBiquadFilter();
    this.lp.connect(this.delay);
    this.lp.connect(this.analyser);
    this.lp.frequency.value = 1000;
    this.lp.gain.value = 0;
    this.lp.type = 'lowshelf';

    this.hp = this.audio.createBiquadFilter();
    this.hp.connect(this.lp);
    this.hp.frequency.value = 1000;
    this.hp.gain.value = 0;
    this.hp.type = 'highshelf';
  }
  togglePlayback() {
    if (this.player) {
      this.player = undefined;
      this.pcmNode.disconnect();
    } else {
      this.vars = {'t': expr.varExpr(0), 'r': expr.varExpr(0)};
      this.player = expr.parse(this.validInput, this.vars, FUNCS);
      this.pcmNode.connect(this.analyser);
    }
  }
  compile(s) {
    this.input = s;
    var f = expr.parse(s, this.vars, FUNCS);
    if (f) {
      console.log("YES")
      this.validInput = s;
      window.location.hash = encodeURIComponent(s);
      if (this.player) {
        this.player = f;
      }
    } else {
      console.log("NO")
      this.validInput = undefined;
    }
  }
  isValid() {
    return typeof(this.validInput)!=='undefined';
  }

  waveFile() {
    if (!this.validInput) {
      return;
    }
    var vars = {'t': expr.varExpr(0), 'r': expr.varExpr(0)};
    var wave = expr.parse(this.validInput, vars, FUNCS);
    var length = 30 * this.sampleRate;

    var intBuffer = new Int16Array(length + 23), tmp;
    intBuffer[0] = 0x4952; // "RI"
    intBuffer[1] = 0x4646; // "FF"
    intBuffer[2] = (2*length + 15) & 0x0000ffff; // RIFF size
    intBuffer[3] = ((2*length + 15) & 0xffff0000) >> 16; // RIFF size
    intBuffer[4] = 0x4157; // "WA"
    intBuffer[5] = 0x4556; // "VE"
    intBuffer[6] = 0x6d66; // "fm"
    intBuffer[7] = 0x2074; // "t "
    intBuffer[8] = 0x0012; // fmt chunksize: 18
    intBuffer[9] = 0x0000; //
    intBuffer[10] = 0x0001; // format tag : 1
    intBuffer[11] = 1;     // channels: 1
    intBuffer[12] = this.sampleRate & 0x0000ffff; // sample per sec
    intBuffer[13] = (this.sampleRate & 0xffff0000) >> 16; // sample per sec
    intBuffer[14] = (2*this.sampleRate) & 0x0000ffff; // byte per sec
    intBuffer[15] = ((2*this.sampleRate) & 0xffff0000) >> 16; // byte per sec
    intBuffer[16] = 0x0004; // block align
    intBuffer[17] = 0x0010; // bit per sample
    intBuffer[18] = 0x0000; // cb size
    intBuffer[19] = 0x6164; // "da"
    intBuffer[20] = 0x6174; // "ta"
    intBuffer[21] = (2*length) & 0x0000ffff; // data size[byte]
    intBuffer[22] = ((2*length) & 0xffff0000) >> 16; // data size[byte]

    for (var i = 0; i < length; i++) {
      var v = wave();
      v = (v&0xff)/0x80 - 1;
      vars.r(vars.r()+1);
      vars.t(Math.round(vars.r()*this.sampleStep));
      intBuffer[i+23] = Math.round(v * (1 << 15));
    }
    return intBuffer.buffer;
  }

  save() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var blob = new Blob([this.waveFile()], {type: "audio/wav"}),
    url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'glitch.wav';
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
}
