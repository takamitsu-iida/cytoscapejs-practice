/* global cytoscape, iida */

(function() {

  // iida.の下にcytoscapeを走らせる関数を作成する
  iida.topology = function() {

    var cy = window.cy = cytoscape({

      container: document.getElementById('cy'),

      layout: {
        name: 'preset',  // 位置をマニュアル指定
        // name: 'grid',  // グリッド状にノードを配置
        // name: 'circle',  // 円状にノードを配置
        // name: 'breadthfirst',  // ツリー状に配置
        directed: true,
        padding: 10
      },

      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(id)',
            'height': 60,
            'width': 60,
            'background-fit': 'cover',
            'border-color': '#000',
            'border-width': 3,
            'border-opacity': 0.5
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
          selector: '.dog',
          style: {
            'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg'
          }
        },
        {
          selector: '.cat',
          style: {
            'background-image': 'https://farm2.staticflickr.com/1261/1413379559_412a540d29_b.jpg'
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
      ],

      __elements: {
        nodes: [
          { data: { id: 'a' } },
          { data: { id: 'b' } },
          { data: { id: 'c' } },
          { data: { id: 'mid' }, classes: 'mid' },

          { data: { id: 'd' } },

          { data: { id: 'e' }, classes: 'src'},
          { data: { id: 'f' }, classes: 'dst'},

          { data: { id: 'g' } },

          { data: { id: 'h' } },
          { data: { id: 'i' } },

          { data: { id: 'j' } },
        ],
        edges: [
          { data: { source: 'a', target: 'mid' } },
          { data: { source: 'b', target: 'mid' } },
          { data: { source: 'mid', target: 'c' } },

          { data: { source: 'e', target: 'f' } },

          { data: { source: 'h', target: 'i' } },
        ]
      }

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
