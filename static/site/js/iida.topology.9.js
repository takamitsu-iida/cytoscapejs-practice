/* global cytoscape, iida */

// elkjsの例
// https://github.com/OpenKieler/elkjs

(function() {

  // iida.の下にcytoscapeを走らせる関数を作成する
  iida.topology = function() {

    var style_option = [
      {
        selector: 'node',
        style: {
          'label': 'data(id)',
          'shape': 'rectangle',  // 'data(type)',
          'height': 25,
          'width': 25,
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
        selector: 'node:parent',
        css: {
          'background-opacity': 0.333
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
    ];

    var layout_option = {
      // name: 'preset',  // 位置をマニュアル指定
      // name: 'grid',  // グリッド状にノードを配置
      // name: 'circle',  // 円状にノードを配置
      // name: 'breadthfirst',  // 上から下向きにツリー状に配置
      // name: 'klay',  // 横向きのツリー状に配置
      // name: 'elk',  // klayの後継
      // name: 'cola',  // cola.jsを利用
      // name: 'dagre',
      name: 'cose-bilkent',
    };

    var elements = {
      nodes: [
        { data: { id: 'a' }, classes: 'router'},
        { data: { id: 'b' }, classes: 'router'},

        { data: { id: 'cd' }},
        { data: { id: 'c', parent: 'cd' }, classes: 'router'},
        { data: { id: 'd', parent: 'cd' }, classes: 'router'},

        { data: { id: 'e' }, classes: 'router'},

        { data: { id: 'fg' }},
        { data: { id: 'f', parent: 'fg' }, classes: 'router'},
        { data: { id: 'g', parent: 'fg' }, classes: 'router'},

        { data: { id: 'h' }, classes: 'router'},
      ],
      edges: [
        { data: { source: 'a', target: 'b' } },
        { data: { source: 'a', target: 'b' } },
        { data: { source: 'b', target: 'cd' } },
        { data: { source: 'cd', target: 'e' } },
        { data: { source: 'e', target: 'fg' } },
        { data: { source: 'fg', target: 'h' } },
      ]
    };

    var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),

      minZoom: 1,
      maxZoom: 2,

      boxSelectionEnabled: false,
      autounselectify: true,

      layout: layout_option,
      style: style_option,
      elements: elements
    });

    // add the panzoom control
    cy.panzoom({
      zoomDelay: 30,
      minZoom: 1,
      maxZoom: 2,
    });

    // cy.resize();
    cy.fit();

  };
  //
})();
