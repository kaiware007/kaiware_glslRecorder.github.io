var startTime = new Date().getTime();
var timeLength = 10.0;
var timePosition = 0.0;
var fps = 0.0;
var isDragSlider = false;
var isPlaying = true;
var isChangeSlider = false;
var glWidth = 640;
var glHeight = 360;
var startTimePos = 0.0;
var isRecording = false;
var targetfps = 60;
var frame = 0;
var maxframe = 0;
var encoder = null;

function changeTimeLength()
{
  if(isRecording)
    return;

  timeLength = document.getElementById("timeLength").value;
  document.getElementById("timeline").max = timeLength;
}

function onInputSlider()
{
  if(isRecording)
    return;

  isDragSlider = true;
  isChangeSlider = true;
  //console.log(typeof document.getElementById("timeline").value);
  timePosition = Number(document.getElementById("timeline").value);
}

function onChangeSlider(){
  if(isRecording)
    return;

  isDragSlider = false;
  isChangeSlider = true;
  //timePosition = document.getElementById("timeline").value;
  timePosition = Number(document.getElementById("timeline").value);
}

function onClickPlayButton(){
  if(isRecording)
    return;

  isPlaying = !isPlaying;
  displayPlayButton();
  isDragSlider = false;
}

function displayPlayButton(){
  if(!isPlaying){
    //document.getElementById("playbutton").value="▷";
    document.getElementById("playbutton").style.display="none";
    document.getElementById("pausebutton").style.display="inline";
  }else{
    //document.getElementById("playbutton").value="| |";
    document.getElementById("playbutton").style.display="inline";
    document.getElementById("pausebutton").style.display="none";
  }
}

onload = function(){
  var editor = CodeMirror.fromTextArea(document.getElementById("user_shader"),
  {
      mode: "glsl",
      theme: "darcula",
      lineNumbers: true,　 // 行番号を表示する
      // lineWrapping: true,
      matchBrackets: true,
      indentWithTabs: false,
      tabSize: 4,
      indentUnit: 4,
      styleActiveLine: true,
      showCursorWhenSelecting: true,
      //viewportMargin: Infinity,
      viewportMargin: 0,
      scrollbarStyle: "simple",
      lineWrapping: true,
  });
  editor.setSize('100%', null);
  // editor.setSize(null, null);
  // editor.setSize(640,500);

  // canvas エレメントを取得
  var c = document.getElementById('canvas');
  c.width = glWidth;
  c.height = glHeight;

  // c.style="width:1280px; height:720px;"

  var gl = c.getContext('webgl', {preserveDrawingBuffer: true}) || c.getContext('experimental-webgl', {preserveDrawingBuffer: true});

  // attributeの要素数を配列に格納
  var attStride = new Array();
  attStride[0] = 3;
  //attStride[1] = 4;
  attStride[1] = 2;

  // モデル(頂点)データ
  var position = [
      -1.0, -1.0,  0.0,
       1.0, -1.0,  0.0,
      -1.0,  1.0,  0.0,
       1.0,  1.0,  0.0
  ];

  // テクスチャ座標
  var textureCoord = [
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0,
      1.0, 1.0
  ];

  // 頂点インデックス
  var index = [
      0, 1, 2,
      3, 2, 1
  ];

  // VBOの生成
  var vPosition     = create_vbo(position);
  var vTextureCoord = create_vbo(textureCoord);
  var VBOList       = [vPosition, vTextureCoord];
  var iIndex        = create_ibo(index);

  // uniformLocationの取得
  var uniLocations = new Array();

  // イベントの登録
  var compileButton = document.getElementById('shader_compile').onclick = () => {
    if(isRecording)
      return;

    let startTime = new Date().getTime();
    initWebGL();
    let compileTime = (new Date().getTime() - startTime)/1000;
    render();
    document.getElementById("compile_status").innerHTML = "compiled in " + compileTime + " secs";
  }

  var timeoutButton = document.getElementById('timelineoutput').onchange = () => {
    if(isRecording)
      return;
    changeTimePosition();
  }

  var renderButton = document.getElementById('renderbutton').onclick = () => {
      if(!isRecording)
      {
        startRecord();
      }else{
        stopRecord();
      }
  }

  var resolutionSelect = document.getElementById('resolution').onchange = () => {
    let index = document.getElementById('resolution').selectedIndex;
    let value = document.getElementById('resolution').value;
    let resolution = value.split('x');
    glWidth  = Number(resolution[0]);
    glHeight = Number(resolution[1]);
    changeCanvasSize(glWidth, glHeight);
    render();
  }

  var startTimeInput = document.getElementById('starttime').onchange = () => {
    if(isRecording)
      return;
    startTimePos = Number(document.getElementById('starttime').value);
    render();
  }

  displayPlayButton();
  initWebGL();

  // カウンタの宣言
  var count = 0;
  changeTimeLength();
  timePosition = 0;
  var oldTime = new Date().getTime();

  // レンガリング開始
  requestAnimationFrame(drawScene);

  function drawScene(){
    var nowTime = new Date().getTime();
    var mt = (nowTime - oldTime)/1000;

    if((isPlaying || isChangeSlider) && !isRecording){

      // カウンタをインクリメントする
      count++;
      if(!isDragSlider)
      {
        timePosition += mt;
        if(timePosition > timeLength){
          timePosition = timePosition - timeLength;
        }
        //console.log(timePosition);
        //timelineoutput.innerHTML = time;
      }
      changeSliderPos(timePosition);
      fps = 1 / mt;
      //console.log(fps);

      showTime(timePosition);
      showFps(fps);

      render();

      isChangeSlider = false;
    }
    if(isRecording)
    {
      updateRecord();
    }
    oldTime = nowTime;

    requestAnimationFrame(drawScene);
  }

  function render(){
    // canvasを初期化
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // uniform変数にテクスチャを登録
    gl.uniform1f(uniLocation[0], startTimePos + timePosition);
    gl.uniform3fv(uniLocation[1], [c.width, c.height, 0]);
    gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);

    // コンテキストの再描画
    gl.flush();
  }

  function changeResolution(){
      let index = document.getElementById('resolution').selectedIndex;
      let value = document.getElementById('resolution').value;
      let resolution = value.split('x');
      glWidth  = Number(resolution[0]);
      glHeight = Number(resolution[1]);
      changeCanvasSize(glWidth, glHeight);
      render();
  }

  function startRecord(){
    isRecording = true;

    // changeResolution();
    document.getElementById('renderbutton').value = "Stop Record";

    targetfps = Number(document.getElementById('targetfps').value);
    timeLength = document.getElementById("timeLength").value;

    frame = 0;
    maxframe = Math.floor(targetfps * timeLength);
    encoder = new Whammy.Video(targetfps);
  }

  function updateRecord(){
    if(frame > maxframe)
    {
      isRecording = false;
      encoder.compile(false, function (output) {
        exportVideo(output);
      });
      document.getElementById('renderlog').innerHTML = "Render finished";
      return;
    }
    render();

    encoder.add(c.toDataURL('image/webp'));

    timePosition += 1 / targetfps;
    frame++;

    document.getElementById('renderlog').innerHTML = "Rendering " + frame + " / " + maxframe;
  }

  function stopRecord(){
    isRecording = false;

    encoder = null;

    document.getElementById('renderbutton').value = "Start Record";
  }

  function exportVideo (blob){
    // window.open(URL.createObjectURL(blob), "resizable=no,scrollbars=yes,status=no");
    let video = document.getElementById("outputvideo");
    if(video == null){
      video = document.createElement('video');
      video.src = URL.createObjectURL(blob);
      video.loop = true;
      video.controls = true;
      video.id = "outputvideo";
      document.body.appendChild(video);
    }else{
      video.src = URL.createObjectURL(blob);
      video.loop = true;
      video.controls = true;
      video.id = "outputvideo";
    }
  }

  function playTimeline(){
    startTime = new Date().getTime();
  }

  function showTime(time){
    //document.getElementById("timelineoutput").innerHTML = time.toFixed(2);
    document.getElementById("timelineoutput").value = time.toFixed(2);
  }

  function showFps(fps){
    document.getElementById("fps").innerHTML = fps.toFixed(1) + "fps";
  }

  function changeTimePosition()
  {
    time = Number(document.getElementById("timelineoutput").value);
    timePosition = time;
    changeSliderPos(timePosition);
    render();
  }

  function changeSliderPos(pos)
  {
    document.getElementById("timeline").value = pos;
  }

  function changeCanvasSize(width, height)
  {
    //var c = document.getElementById('canvas');
    c.width = width;
    c.height = height;

    initWebGL();

    var left = document.getElementById("blockleft");
    left.style.width = width;
  }

  function initWebGL(){
    // webglコンテキストを取得
    //var gl = c.getContext('webgl') || c.getContext('experimental-webgl');
     gl = c.getContext('webgl') || c.getContext('experimental-webgl');

    // 頂点シェーダとフラグメントシェーダの生成
    var v_shader = create_v_shader(
      'attribute vec3 position;'+
      'attribute vec2 textureCoord;'+
      'varying   vec2 vTextureCoord;'+
      'void main(void){'+
      '   vTextureCoord = textureCoord;'+
      '   gl_Position = vec4(position, 1.0);'+
      '}'
    );

    var fs_base = 'precision mediump float;'+
    'varying vec2 vTextureCoord;'+
    'uniform float iTime;'+
    'uniform vec3  iResolution;'+
    ' '+
    'USER_SHADER_CODE'+
    ' '+
    'void main(void){'+
    '    vec4 col = vec4(0);'+
    ' '+
    '    mainImage(col, vTextureCoord * iResolution.xy);'+
    ' '+
    '    gl_FragColor = col;'+
    '}';

    editor.save();

    var f_shaderElement = document.getElementById('user_shader');

    if(!f_shaderElement){
      console.log('not found user_shader');
    }

    var fs = fs_base.replace('USER_SHADER_CODE', f_shaderElement.value);
    console.log(fs);
    var f_shader = create_f_shader(fs);

    // プログラムオブジェクトの生成とリンク
    var prg = create_program(v_shader, f_shader);


    // attributeLocationを配列に取得
    var attLocation = new Array();
    attLocation[0] = gl.getAttribLocation(prg, 'position');
    attLocation[1] = gl.getAttribLocation(prg, 'textureCoord');

     // VBOとIBOの登録
    set_attribute(VBOList, attLocation, attStride);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iIndex);

    // uniformLocationの取得
    uniLocation = new Array();
    uniLocation[0]  = gl.getUniformLocation(prg, 'iTime');
    uniLocation[1]  = gl.getUniformLocation(prg, 'iResolution');
  }

  function create_v_shader(code)
  {
      var shader = gl.createShader(gl.VERTEX_SHADER);

      // 生成されたシェーダにソースを割り当てる
      gl.shaderSource(shader, code);

      // シェーダをコンパイルする
      gl.compileShader(shader);

      // シェーダが正しくコンパイルされたかチェック
      if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){

          // 成功していたらシェーダを返して終了
          return shader;
      }else{

          // 失敗していたらエラーログをアラートする
          // alert(gl.getShaderInfoLog(shader));
          document.getElementById('errormessage').value = gl.getShaderInfoLog(shader);

      }
  }

  function create_f_shader(code)
  {
      var shader = gl.createShader(gl.FRAGMENT_SHADER);

      // 生成されたシェーダにソースを割り当てる
      gl.shaderSource(shader, code);

      // シェーダをコンパイルする
      gl.compileShader(shader);

      // シェーダが正しくコンパイルされたかチェック
      if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){

          document.getElementById('errormessage').value = '';
          // 成功していたらシェーダを返して終了
          return shader;
      }else{

          // 失敗していたらエラーログをアラートする
          // alert(gl.getShaderInfoLog(shader));
          console.log(gl.getShaderInfoLog(shader));
          document.getElementById('errormessage').value = gl.getShaderInfoLog(shader);
      }
  }

  function create_shader(id){
    // シェーダを格納する変数
    var shader;

    // HTMLからscriptタグへの参照を取得
    var scriptElement = document.getElementById(id);

    // scriptタグが存在しない場合は抜ける
    if(!scriptElement){return;}

    // scriptタグのtype属性をチェック
    switch(scriptElement.type){

        // 頂点シェーダの場合
        case 'x-shader/x-vertex':
            shader = gl.createShader(gl.VERTEX_SHADER);
            break;

        // フラグメントシェーダの場合
        case 'x-shader/x-fragment':
            shader = gl.createShader(gl.FRAGMENT_SHADER);
            break;
        default :
            return;
    }

    // 生成されたシェーダにソースを割り当てる
    gl.shaderSource(shader, scriptElement.text);

    // シェーダをコンパイルする
    gl.compileShader(shader);

    // シェーダが正しくコンパイルされたかチェック
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){

        // 成功していたらシェーダを返して終了
        return shader;
    }else{

        // 失敗していたらエラーログをアラートする
        alert(gl.getShaderInfoLog(shader));
    }
  }

  function create_program(vs, fs){
    // プログラムオブジェクトの生成
    var program = gl.createProgram();

    // プログラムオブジェクトにシェーダを割り当てる
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    // シェーダをリンク
    gl.linkProgram(program);

    // シェーダのリンクが正しく行なわれたかチェック
    if(gl.getProgramParameter(program, gl.LINK_STATUS)){

        // 成功していたらプログラムオブジェクトを有効にする
        gl.useProgram(program);

        // プログラムオブジェクトを返して終了
        return program;
    }else{

        // 失敗していたらエラーログをアラートする
        alert(gl.getProgramInfoLog(program));
    }
  }

  function create_vbo(data){
    // バッファオブジェクトの生成
    var vbo = gl.createBuffer();

    // バッファをバインドする
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    // バッファにデータをセット
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

    // バッファのバインドを無効化
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // 生成した VBO を返して終了
    return vbo;
  }

  // IBOを生成する関数
  function create_ibo(data){
    // バッファオブジェクトの生成
    var ibo = gl.createBuffer();

    // バッファをバインドする
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    // バッファにデータをセット
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);

    // バッファのバインドを無効化
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // 生成したIBOを返して終了
    return ibo;
  }

  // VBOをバインドし登録する関数
  function set_attribute(vbo, attL, attS){
      // 引数として受け取った配列を処理する
      for(var i in vbo){
          // バッファをバインドする
          gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);

          // attributeLocationを有効にする
          gl.enableVertexAttribArray(attL[i]);

          // attributeLocationを通知し登録する
          gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
      }
  }

  // フレームバッファをオブジェクトとして生成する関数
  function create_framebuffer(width, height){
      // フレームバッファの生成
      var frameBuffer = gl.createFramebuffer();

      // フレームバッファをWebGLにバインド
      gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

      // 深度バッファ用レンダーバッファの生成とバインド
      var depthRenderBuffer = gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);

      // レンダーバッファを深度バッファとして設定
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);

      // フレームバッファにレンダーバッファを関連付ける
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRenderBuffer);

      // フレームバッファ用テクスチャの生成
      var fTexture = gl.createTexture();

      // フレームバッファ用のテクスチャをバインド
      gl.bindTexture(gl.TEXTURE_2D, fTexture);

      // フレームバッファ用のテクスチャにカラー用のメモリ領域を確保
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

      // テクスチャパラメータ
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

      // フレームバッファにテクスチャを関連付ける
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fTexture, 0);

      // 各種オブジェクトのバインドを解除
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.bindRenderbuffer(gl.RENDERBUFFER, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      // オブジェクトを返して終了
      return {f : frameBuffer, d : depthRenderBuffer, t : fTexture};
  }
};
