# cytoscape.jsの練習

## ライブデモ(github pages)

練習１．auto-move

<https://takamitsu-iida.github.io/cytoscapejs-practice/index.1.html>

auto-moveの元ネタをローカル環境に合わせて変更したもの。

練習２．auto-move・・・良い

<https://takamitsu-iida.github.io/cytoscapejs-practice/index.2.html>

ノードの高さを全て同じに揃えることで、横一直線に並ぶように強制したもの。
これはこれで使えると思う。

練習３．klay・・・良い

<https://takamitsu-iida.github.io/cytoscapejs-practice/index.3.html>

klayを使ってノードの位置を自動計算したもの。
なかなかいい感じに収まってるが、複合ノードの中からエッジを出すとおかしくなる。

練習４．elk・・・良い

<https://takamitsu-iida.github.io/cytoscapejs-practice/index.4.html>

klayの後継にあたるのがelkのようだ。これもいい感じだと思う。

練習５．elk・・・良い

<https://takamitsu-iida.github.io/cytoscapejs-practice/index.5.html>

同一ノードペアに複数のエッジが存在する場合の確認。

練習６．cola・・・ダメ

<https://takamitsu-iida.github.io/cytoscapejs-practice/index.6.html>

複合ノードが存在したときに使うのがcolaだけど、実際にやってみるとダメダメな感じ。

練習７．dagre・・・ダメ

<https://takamitsu-iida.github.io/cytoscapejs-practice/index.7.html>

よくわからないけど、本家のサイトに例としてよく挙げられているので動作を確認したもの。

練習８．cose-bilkent・・・良い

<https://takamitsu-iida.github.io/cytoscapejs-practice/index.8.html>

複合ノードを扱うときに最も好ましいレイアウトになるのがcose-bilkentのようだ。

でも何で下から上に向かって伸びてくのかな？
向きを制御する方法はなさそう。

練習９．bootstrapでレイアウトした中にグラフを入れる・・・左右のスペースがもったいない。

<https://takamitsu-iida.github.io/cytoscapejs-practice/index.9.html>

見栄え調整のためにbootstrapを使った場合の例。

## pan-zoom

便利。

jqueryとfont-awesome4が必要。

<https://github.com/cytoscape/cytoscape.js-panzoom>

## ローカルでの実行方法

index.htmlのある場所に行き、http-serverコマンドでサーバを起動して、<http://127.0.0.1:8080/>にアクセスする。

http-serverのインストール方法。

```bash
npm install -g http-server
```

# 参考

<https://github.com/cytoscape/cytoscape.js>

<https://github.com/jfstephe/cytoscape.js-elk>
<https://github.com/OpenKieler/elkjs>
