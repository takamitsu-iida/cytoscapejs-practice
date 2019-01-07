/* global cytoscape, iida */

// elkjsの例
// https://github.com/OpenKieler/elkjs

(function() {

  // iida.の下にcytoscapeを走らせる関数を作成する
  iida.topology = function() {

    var cy = window.cy = cytoscape({

      container: document.getElementById('cy'),

      layout: {
        // name: 'preset',  // 位置をマニュアル指定
        // name: 'grid',  // グリッド状にノードを配置
        // name: 'circle',  // 円状にノードを配置
        // name: 'breadthfirst',  // 上から下向きにツリー状に配置
        // name: 'klay',  // 横向きのツリー状に配置
        name: 'elk',  // klayの後継
        fit: true,
        padding: 20,
        ranker: 'longest-path',
        animate: true,
        animationDuration: 300,
        animationEasing: 'ease-in-out-cubic',
        elk: {
          'zoomToFit': true,
          // 'algorithm': 'mrtree',  // これを指定すると上から下向きになる
          'algorithm': 'layered',
          'separateConnectedComponents': false
        }
      },

      minZoom: 1,
      maxZoom: 3,

      boxSelectionEnabled: false,
      autounselectify: true,

      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(id)',
            'shape': 'rectangle',  // 'data(type)',
            'height': 30,
            'width': 30,
            'background-color': '#fff',
            'background-fit': 'contain',  // 'cover',
            'border-color': '#fff',  // '#000',
            'border-width': 0,
            'border-opacity': 0.5
          }
        },
        {
          selector: '$node > node',
          css: {
            'padding-top': '10px',
            'padding-left': '10px',
            'padding-bottom': '10px',
            'padding-right': '10px',
            'text-valign': 'top',
            'text-halign': 'center',
            'background-color': '#bbb',
            'opacity': 0.5
          }
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            // 'curve-style': 'segments',
            'width': 2,
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
          { data: { id: 'a' }, classes: 'router'},
          { data: { id: 'b' }, classes: 'router'},

          { data: { id: 'cd' }},
          { data: { id: 'c', parent: 'cd' }, classes: 'router'},
          { data: { id: 'd', parent: 'cd' }, classes: 'router'},

          { data: { id: 'e' }, classes: 'router'},

          { data: { id: 'f' }, classes: 'router'},
          { data: { id: 'g' }, classes: 'router'},

          { data: { id: 'h' }, classes: 'router'},
        ],
        edges: [
          { data: { source: 'a', target: 'b' } },

          { data: { source: 'b', target: 'cd' } },

          { data: { source: 'cd', target: 'e' } },

          { data: { source: 'e', target: 'f' } },
          { data: { source: 'e', target: 'g' } },

          { data: { source: 'f', target: 'h' } },
          { data: { source: 'g', target: 'h' } },
        ]
      },


    });
  };
  //
})();
