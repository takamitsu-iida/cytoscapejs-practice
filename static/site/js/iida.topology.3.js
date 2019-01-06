/* global cytoscape, iida, tippy */

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
        name: 'klay',  // 横向きのツリー状に配置
        animate: true
      },

      minZoom: 1,
      maxZoom: 2,

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
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'width': 3,
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
          { data: { id: 'c' }, classes: 'router'},

          { data: { id: 'd' }, classes: 'router'},

          { data: { id: 'e' }, classes: 'router'},

          { data: { id: 'f' }, classes: 'router'},
          { data: { id: 'g' }, classes: 'router'},

          { data: { id: 'h' }, classes: 'router'},
        ],
        edges: [
          { data: { source: 'a', target: 'b' } },

          { data: { source: 'b', target: 'c' } },
          { data: { source: 'b', target: 'd' } },

          { data: { source: 'c', target: 'e' } },
          { data: { source: 'd', target: 'e' } },

          { data: { source: 'e', target: 'f' } },
          { data: { source: 'e', target: 'g' } },

          { data: { source: 'f', target: 'h' } },
          { data: { source: 'g', target: 'h' } },
        ]
      }
    });

    var makeTippy = function (node, text) {
      return tippy(node.popperRef(), {
        html: (function () {
          var div = document.createElement('div');

          div.innerHTML = text;

          return div;
        })(),
        trigger: 'manual',
        arrow: true,
        placement: 'bottom',
        hideOnClick: false,
        multiple: true,
        sticky: true
      }).tooltips[0];
    };

    var a = cy.getElementById('a');
    var tippyA = makeTippy(a, 'ここから');
    tippyA.show();

    var h = cy.getElementById('h');
    var tippyH = makeTippy(h, 'ここまで');
    tippyH.show();

  };
  //
})();
