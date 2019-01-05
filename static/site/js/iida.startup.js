/* global cytoscape, iida */

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

    var cy = window.cy = cytoscape({

      container: document.getElementById('cy'),

      layout: {
        name: 'preset'
      },

      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(id)'
          }
        },
        {
          selector: '.mid',
          style: {
            'width': 8,
            'height': 8,
            'label': ''
          }
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'width': 6,
            'target-arrow-shape': 'triangle',
            'line-color': '#ffaaaa',
            'target-arrow-color': '#ffaaaa'
          }
        }
      ],

      elements: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
        { data: { id: 'c' } },
        { data: { id: 'mid' }, classes: 'mid' },
        { data: { source: 'a', target: 'mid' } },
        { data: { source: 'b', target: 'mid' } },
        { data: { source: 'mid', target: 'c' } },

        { data: { id: 'd' } },

        { data: { id: 'e' } },
        { data: { id: 'f' } },
        { data: { source: 'e', target: 'f' } },

        { data: { id: 'g' } },

        { data: { id: 'h' } },
        { data: { id: 'i' } },
        { data: { source: 'h', target: 'i' } },

        { data: { id: 'j' } },
      ]
    });

    // a, b, c; with mid in the middle

    cy.$('#a, #b, #c').makeLayout({
      name: 'circle',
      boundingBox: {
        x1: 0,
        y1: 0,
        x2: 300,
        y2: 300
      }
    }).run();

    cy.automove({
      nodesMatching: cy.$('#mid'),
      reposition: 'mean',
      meanOnSelfPosition: function(){ return false; }
    });

    // dragging mid drags its neighbourhood with it
    cy.automove({
      nodesMatching: cy.$('#mid').neighbourhood().nodes(),
      reposition: 'drag',
      dragWith: cy.$('#mid')
    });


    // d can't go out of a box

    cy.automove({
      nodesMatching: cy.$('#d'),
      reposition: { x1: 350, x2: 450, y1: 100, y2: 200 }
    });

    cy.$('#d').position({ x: 400, y: 150 });


    // e & f have the same y

    var eAndF = cy.$('#e, #f');

    eAndF.makeLayout({
      name: 'grid',
      boundingBox: { x1: 0, x2: 300, y1: 300, y2: 400 },
      cols: 4,
      fit: false
    }).run();

    cy.automove({
      nodesMatching: cy.$('#e, #f'),
      reposition: function( node ){
        var pos = node.position();

        if( node.grabbed() ){ return pos; }

        var otherNode = eAndF.not( node );

        return {
          x: pos.x,
          y: otherNode.position('y')
        };
      },
      when: 'matching'
    });


    // g kept in viewport

    cy.$('#g').position({ x: 400, y: 350 });

    cy.fit( 100 ); // make sure g is in the viewport for the demo

    cy.automove({
      nodesMatching: cy.$('#g'),
      reposition: 'viewport'
    });


    // i gets pulled along with h on drag

    cy.$('#h').position({ x: 585, y: 195 });
    cy.$('#i').position({ x: 510, y: 260 });

    cy.automove({
      nodesMatching: cy.$('#i'),
      reposition: 'drag',
      dragWith: cy.$('#h')
    });


    // j can't go in the box of d

    cy.$('#j').position({ x: 585, y: 350 });

    cy.automove({
      nodesMatching: cy.$('#j'),
      reposition: { type: 'outside', x1: 350, x2: 450, y1: 100, y2: 200 }
    });


    cy.fit( 100 ); // fit to all the layouts


    // .automove-viewport nodes kept in viewport (even if added after this call)
    // convenient but less performant than `nodesMatching: collection`

    cy.automove({
      nodesMatching: '.automove-viewport',
      reposition: 'viewport'
    });

    cy.on('tap', function( evt ){
      var tgt = evt.target || evt.cyTarget; // 3.x || 2.x

      if( tgt === cy ){
        cy.add({
          classes: 'automove-viewport',
          data: { id: 'new' + Math.round( Math.random() * 100 ) },
          position: {
            x: evt.position.x,
            y: evt.position.y
          }
        });
      }
    });

    cy.on('cxttap', 'node', function( evt ){
      var tgt = evt.target || evt.cyTarget; // 3.x || 2.x

      tgt.remove();
    });

  };
  //
})();
