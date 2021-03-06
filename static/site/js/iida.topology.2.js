/* global cytoscape, iida */

(function() {

  // iida.の下にcytoscapeを走らせる関数を作成する
  iida.topology = function() {

    var cy = window.cy = cytoscape({

      container: document.getElementById('cy'),

      layout: {
        name: 'preset',  // 位置をマニュアル指定
        // name: 'klay',  // 横向きのツリー状に配置
        // name: 'grid',  // グリッド状にノードを配置
        // name: 'circle',  // 円状にノードを配置
        // name: 'breadthfirst',  // 上から下向きにツリー状に配置
        padding: 10
      },

      boxSelectionEnabled: true,
      autounselectify: true,
      minZoom: 1,
      maxZoom: 2,

      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(id)',
            'shape': 'rectangle',  // 'data(type)',
            'height': 40,
            'width': 40,
            'background-color': '#fff',
            'background-fit': 'contain',  // 'cover',
            'border-color': '#fff',  // '#000',
            'border-width': 0,
            'border-opacity': 0.5
          }
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'width': 6,
            'target-arrow-shape': 'triangle',
            'line-color': '#dd4de2',
            'target-arrow-color': '#dd4de2',
            'opacity': 0.5
          }
        },
        {
          selector: '.router',
          style: {
            'background-image': 'https://takamitsu-iida.github.io/cytoscapejs-practice/static/site/img/router.jpg'
          }
        },
        {
          selector: '.firewall',
          style: {
            'background-image': 'https://takamitsu-iida.github.io/cytoscapejs-practice/static/site/img/firewall.jpg'
          }
        }
      ],

      elements: {
        nodes: [
          { data: { id: 'e' }, classes: 'router'},
          { data: { id: 'f' }, classes: 'router'},
          { data: { id: 'g' }, classes: 'router'},
          { data: { id: 'h' }, classes: 'router'},
        ],
        edges: [
          { data: { source: 'e', target: 'f' } },
          { data: { source: 'f', target: 'g' } },
          { data: { source: 'g', target: 'h' } },
        ]
      }

    });

    var allNodes = cy.nodes();

    // 横一直線に並べる
    allNodes.makeLayout({
      name: 'grid',
      boundingBox: { x1: 100, x2: 600, y1: 100, y2: 400 },
      cols: allNodes.length + 2,
      fit: false
    }).run();

    cy.automove({
      nodesMatching: cy.$('#e, #f, #g, #h'),
      reposition: function( node ) {
        // ドラッグしているノードならその位置を返却
        if (node.grabbed()) {
          return node.position();
        }

        // それ以外のノードに対しては、Y座標はドラッグしているノードと同じものを返却する
        var pos = {
          x: node.position('x'),
          y: node.position('y')
        };

        allNodes.forEach(function(n) {
          if (n.grabbed()) {
            pos.y = n.position('y');
          }
        });

        return pos;
      },
      when: 'matching'
    });

    cy.fit( 100 ); // fit to all the layouts

    // .automove-viewport nodes kept in viewport (even if added after this call)
    // convenient but less performant than `nodesMatching: collection`

    cy.automove({
      nodesMatching: '.automove-viewport',
      reposition: 'viewport'
    });

  };
  //
})();
