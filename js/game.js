enchant();

 // コンストラクタ
function interpreter() {
  // プロパティ
  this.images = 背景画像;
  this.charas = 登場人物;
  // this.ongaku = 音楽;
  this.bg = null;         // バックグラウンド
  this.chara =[];         // キャラ
  this.name = null;       // 名前
  this.text = null;       // テキスト
  this.selectText = null; // 選択肢のテキスト
  this.select1 = null;    // 選択肢1
  this.select2 = null;    // 選択肢2
  this.select3 = null;    // 選択肢2
  this.select4 = null;    // 選択肢2
  this.next = null;       // 次のシーン名
  this.variables = [];    // 変数
  this.scene = null;      // シーン
};


// 音楽を鳴らす
// '音楽': ['音楽名'];
// interpreter.prototype.音楽 = function (args) {
// }






// 背景画像を表示するコマンド(メソッド)
// '背景画像': ['画像名', 幅, 高さ, , x座標(オプション), y座標(オプション)]
interpreter.prototype.背景画像 = function(args) {
  var bg = new Sprite(args[1], args[2]);
  bg.image = coer.assets[this.images[args[0]]];
  bg.x = args[3] ? args[3] : 0;
  bg.y = args[4] ? args[4] : 0;
  imageLayer.addChild(bg);
  this.bg = bg;
}

// キャラ(1人目)を表示するコマンド(メソッド)
// 'キャラ1': ['人物画像名', 幅, 高さ, x座標(オプション), y座標（オプション）]
interpreter.prototype.キャラ1 = function(args) {
  var chara = new Sprite(args[1], args[2]);
  chara.image = coer.assets[this.charas[args[0]]];
  chara.x = args[3] ? args[3] : 0;
  chara.y = args[4] ? args[4] : 0;
  imageLayer.addChild(chara);
  this.chara[args[0]] = chara;
}

// キャラ(2人目)を表示するコマンド(メソッド)
// 'キャラ2': ['人物画像名', 幅, 高さ, x座標(オプション), y座標（オプション）]
interpreter.prototype.キャラ2 = function(args) {
  var chara = new Sprite(args[1], args[2]);
  chara.image = coer.assets[this.charas[args[0]]];
  chara.x = args[3] ? args[3] : 0;
  chara.y = args[4] ? args[4] : 0;
  imageLayer.addChild(chara);
  this.chara[args[0]] = chara;
}

// キャラのポジションを変更するコマンド(メソッド)
// 'ポジション': ['人物画像名', x座標, y座標]
interpreter.prototype.ポジション = function(args) {
  this.chara[args[0]].x = args[1];
  this.chara[args[0]].y = args[2];
}

// キャラをズームするコマンド(メソッド)
// 'ズーム': ['人物画像名', x方向の拡大率, y方向の拡大率(オプション)]
// y方向の拡大率を省略すると縦横同じ比率で拡大縮小
// 負の数を指定すると反転
interpreter.prototype.ズーム = function(args) {
  this.chara[args[0]].scaleX = args[1];
  this.chara[args[0]].scaleY = args[2] ? args[2] : args[1];
}

// キャラを回転するコマンド(メソッド)
// '回転': ['人物画像名', 角度]
interpreter.prototype.回転 = function(args) {
  this.chara[args[0]].rotation = args[1];
}

// セリフを表示するコマンド(メソッド)
// 'セリフ': ['名前ラベル', 'テキスト']
interpreter.prototype.セリフ = function(args) {
  if (args[0]==undefined) args[0] = "";
  if (args[1]==undefined) args[1] = "";
  var name = new Label(args[0]);
  name.font = "12px monospace";
  name.color = "rgb(255, 255, 255)";
  name.backgroundColor = "rgba(0, 0, 0, 0.6)";
  name.y = 320 - 32 * 3;
  name.width = 320;
  name.height = 32 * 3;
  textLayer.addChild(name);
  this.name = name;

  var text = new Label(args[1]);
  text.font  = "12px monospace";
  text.color = "rgb(255, 255, 255)";
  text.y     = 320 - 32 * 2;
  text.width = 320;
  textLayer.addChild(text);
  this.text = text;
}

// セリフをクリアするコマンド(メソッド)
// 'セリフクリア': null
interpreter.prototype.セリフクリア = function() {
  textLayer.removeChild(this.name);
  textLayer.removeChild(this.text);
  textLayer.removeChild(this.next);
  delete this.name;
  delete this.text;
  delete this.next;
}

// 指定したシーンにジャンプするコマンド(メソッド)
// 'ジャンプ': 'シーン名'
interpreter.prototype.ジャンプ = function(args) {
  var self = this;
  var next = new Label('【次へ】');
  next.font  = "12px monospace";
  next.color = "rgb(255,200,0)";
  next.x     = 320 - 64;
  next.y     = 320 - 32;
  next.width = 320;

  textLayer.addChild(next);
  this.next = next;
  next.addEventListener(Event.TOUCH_START, function(e) {
      self.セリフクリア();
      exec(eval(args));
  });
}

// 自動的に指定したシーンにジャンプさせるコマンド(メソッド)
// 'オートジャンプ': 'シーン名'
interpreter.prototype.オートジャンプ = function(arg) {
  exec(eval(arg));
}

// 選択肢を表示するコマンド(メソッド)
// '選択肢': ['テキスト', '選択肢1', 'シーン1', '選択肢2' , 'シーン2']
// 「選択肢1」を選択すると「シーン名1」に指定したシーンにジャンプ
// 「選択肢2」を選択すると「シーン名2」に指定したシーンにジャンプ
interpreter.prototype.選択肢 = function(args) {
  var self = this;
  var text = new Label(args[0]);
  text.font  = "12px monospace";
  text.color = "rgb(255,255,255)";
  text.backgroundColor = "rgba(0,0,0,0.6)";
  text.y     = 320 - 32*3;
  text.width = 320;
  text.height = 32 * 3;
  textLayer.addChild(text);
  this.selectText = text;

  var select1 = new Label('【'+args[1]+'】');
  select1.font  = "12px monospace";
  select1.color = "rgb(255,125,0)";
  select1.y     = 320 - 32;
  select1.x     = 320 - 16*10;
  select1.width = 100;
  textLayer.addChild(select1);
  select1.addEventListener(Event.TOUCH_START, function(e) {
    self.選択肢クリア();
    exec(eval(args[2]));
  });
  this.select1 = select1;

  var select2 = new Label('【'+args[3]+'】');
  select2.font  = "12px monospace";
  select2.color = "rgb(255,125,0)";
  select2.y     = 320 - 32 * 2;
  select2.x     = 320 - 16*10;

  select2.width = 320;
  textLayer.addChild(select2);
  select2.addEventListener(Event.TOUCH_START, function(e) {
    self.選択肢クリア();
    exec(eval(args[4]));
  });
  this.select2 = select2;







  var select3 = new Label('【'+args[5]+'】');
  select3.font  = "12px monospace";
  select3.color = "rgb(255,125,0)";
  select3.y     = 320 - 16*4;
  select3.x     = 20;
  textLayer.addChild(select3);
  select3.addEventListener(Event.TOUCH_START, function(e) {
    self.選択肢クリア();
    exec(eval(args[6]));
  });
  this.select3 = select3;

  var select4 = new Label('【'+args[7]+'】');
  select4.font  = "12px monospace";
  select4.color = "rgb(255,125,0)";
  select4.y     = 320 - 16*2;
  select4.x     = 20;
  textLayer.addChild(select4);
  select4.addEventListener(Event.TOUCH_START, function(e) {
    self.選択肢クリア();
    exec(eval(args[8]));
  });
  this.select4 = select4;






}

// 選択肢をクリアするコマンド(メソッド)
// '選択肢クリア': null
interpreter.prototype.選択肢クリア = function() {
  textLayer.removeChild(this.selectText);
  textLayer.removeChild(this.select1);
  textLayer.removeChild(this.select2);
  textLayer.removeChild(this.select3);
  textLayer.removeChild(this.select4);
  delete this.selectText;
  delete this.select1;
  delete this.select2;
  delete this.select3;
  delete this.select4;
}


// 背景画像を削除するコマンド(メソッド)
// '背景クリア': null
interpreter.prototype.背景クリア = function() {
  imageLayer.removeChild(this.bg);
  delete this.bg;
}

// キャラを削除するコマンド(メソッド)
// '退場': '人物画像名'
interpreter.prototype.退場 = function(arg) {
  imageLayer.removeChild(this.chara[arg]);
  delete this.chara[arg];
}

// イベントリスナを設定するコマンド(メソッド)
// 'イベント': ['人物画像名', 'イベント' , 'リスナ']
interpreter.prototype.イベント = function(args) {
  this.chara[args[0]].addEventListener(args[1], eval(args[2]));
}

// 式を実行するコマンド(メソッド)
// '式': '実行する式'
interpreter.prototype.式 = function(args){
  var val = args.split(" ");
  this.variables[val[0]] = eval(args);
}

// 条件式によって分岐させるコマンド(メソッド)
// '条件分岐': ['条件式', 'シーン1', 'シーン2']
// 「条件式」が真(true)ならシーン1、偽(false)ならシーン2に分岐
interpreter.prototype.条件分岐 = function(args) {
  var val = args[0].split(" ");
  var condition = this.variables[val[0]] + val[1] +val[2];
  if (eval(condition)) {
    exec(eval(args[1]));
  } else exec(eval(args[2]));
}

// セーブするシーン名を設定するコマンド(メソッド)
// 'シーン': 'シーン名'
interpreter.prototype.シーン = function(arg) {
  this.scene = arg;
}

// シナリオを実行する関数
function exec(scenario) {
  for (var command in scenario) {
    var s = (interpreter[command])(scenario[command]);
  }
}


window.onload = function() {

  // 使用する画像を格納する配列
  images = Array();
  // music = Array();
  
  // 使用する背景画像を配列にプッシュ
  for (var key in 背景画像) {
    images.push(背景画像[key]);
  }
  // 使用する人物画像を配列にプッシュ
  for (var key in 登場人物) {
    images.push(登場人物[key]);
  }

  // for (var key in 音楽) {
  //   ongaku.push(音楽[key]);
  // }






  // 「interpreter」オブジェクトを生成する
  interpreter = new interpreter();

  coer = new Core(320, 320);
  coer.fps = 16;
  coer.preload(images);








  // ブラウザのLocalStorageにデータを保存するデバック機能を有効にする
  // 9leapのデータベースに保存する場合は、「false」
  enchant.nineleap.memory.LocalStorage.DEBUG_MODE = true;

  // ゲームIDを設定する
  // ゲームID はシナリオ「scenario.js」の冒頭で指定する
  enchant.nineleap.memory.LocalStorage.GAME_ID = GAME_ID;


















  // 自分のデータを読み込む
  coer.memory.player.preload();

  coer.onload = function() {

    // coer.bgm.volume = 0.5;
    // coer.bgm.play();










    // メモリの初期化
    var save = coer.memory.player.data;
    if (save.scene == null) save.scene = 'start';
    if (save.variables == null) save.variables = [];
    
    // データ復元
    for (var i in save.variables) {
      interpreter.variables[save.variables[i][0]] = save.variables[i][1] 
    }

    // 画像表示用のグループを作成する    
    imageLayer = new Group();
    coer.rootScene.addChild(imageLayer);

    // テキスト表示用のグループを作成する
    textLayer = new Group();
    coer.rootScene.addChild(textLayer);
    
    // セーブしたシーン(最初は「start」)からを実行する
    exec(eval(save.scene));
 
    // セーブラベルを作成する
    var savelabel = new MutableText(16, -100);
    savelabel.text = 'SAVE'
    // セーブラベルの「touchstart」イベントリスナ
    savelabel.addEventListener('touchstart', function(e) {
      this.backgroundColor = '#F0F0F0';


    });
    // セーブラベルの「touchend」イベントリスナ
    savelabel.addEventListener('touchend', function(e) {
      this.backgroundColor = '';




      var save = coer.memory.player.data;
      // シーン名をメモリに書き込む
      save.scene = interpreter.scene;
      // シナリオ中で定義した変数やフラグをメモリに書き込む
      var count =0;
      for (var i in interpreter.variables) {
        save.variables[count] = [i,interpreter.variables[i]];
        count++;
      }
      // 保存を実行する
      coer.memory.update();
    });
    savelabel.addEventListener('enterframe', function(e) {
      this.y =  0; // セーブラベルを見える位置へ
    });
    coer.rootScene.addChild(savelabel);
 
  }

  coer.start();

}