/* global iida */

// グローバルに独自の名前空間を定義する
(function() {
  // このthisはグローバル空間
  this.iida = this.iida || (function() {

    // アプリのデータを取り込む場合、appdata配下にぶら下げる
    var appdata = {};

    // ヒアドキュメント経由で静的データを取り込む場合、テキストデータをheredoc配下にぶら下げる
    var heredoc = {};

    // 公開するオブジェクト
    return {
      appdata: appdata,
      heredoc: heredoc,
    };

  })();
  //
})();

//
// メイン関数の定義
//
(function() {

  // 名前空間iidaの下にmain関数を作成する
  iida.main = function() {

    // cytoscapeを走らせる
    iida.topology();

  };
  //
})();
