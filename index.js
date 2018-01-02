var escape = require('escape-html');

/*
    Generate HTML for the tab in the header

    @param {Block}
    @param {Boolean}
    @return {String}
*/
function createTab(block, i, isActive) {
  return '<div class="tab' + (isActive ? ' active' : '') + '" data-codetab="' + i + '">' + block.kwargs.name + '</div>';
}

/*
    Generate HTML for the tab's content

    @param {Block}
    @param {Boolean}
    @return {String}
*/
function createTabBody(block, ii, isActive, name) {
  if(name === 'Sample') {
    var idx = 0
    var str = ''
    var isFind = false
    for (var i = 0; i < block.body.length; i++) {
      if ((block.body.charAt(i) === '/' || block.body.charAt(i) === '=' || block.body.charAt(i) === '?') && i + 1 < block.body.length && block.body.charAt(i + 1) === '{') {
        isFind = true
        str += block.body.charAt(i)
        str += '<var><span style="color:#ec407a;font-weight:bold;font-style:italic;">'
        i++;
      } else if (isFind && block.body.charAt(i) === '}') {
        isFind = false
        str += '</span></var>'
      } else  str += block.body.charAt(i)
    }
    block.body = str
  }
  block.body = block.body
    .replace(/{/gi, '<var><span style="color:#ec407a;font-weight:bold;font-style:italic;">{')
    .replace(/}/gi, '}</span></var>')
  
  return '<div class="tab' + (isActive ? ' active' : '') + '" data-codetab="' + ii + '">' +
    '<pre><span class="lang-' + (block.kwargs.type || block.kwargs.name) + '">' +
    (block.body) +
    '</span></pre></div>';
}

module.exports = {
  book: {
    assets: './assets',
    css: [
      'codetabs.css'
    ],
    js: [
      'codetabs.js'
    ]
  },

  blocks: {
    pathCodetabs: {
      blocks: ['language'],
      process: function (parentBlock) {
        var blocks = [parentBlock].concat(parentBlock.blocks);
        var tabsContent = '';
        var tabsHeader = '';

        blocks.forEach(function (block, i) {
          var isActive = (i == 0);

          if (!block.kwargs.name) {
            throw new Error('Code tab requires a "name" property');
          }

          tabsHeader += createTab(block, i, isActive);
          tabsContent += createTabBody(block, i, isActive, block.kwargs.name);
        });


        return '<div class="codetabs">' +
          '<div class="codetabs-header">' + tabsHeader + '</div>' +
          '<div class="codetabs-body">' + tabsContent + '</div>' +
          '</div>';
      }
    }
  }
};
