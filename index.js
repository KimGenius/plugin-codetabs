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
function createTabBody(block, i, isActive, name) {
  if(name === 'Sample') {
    let idx = 0
    let str = ''
    let isFind = false
    for (let i = 0; i + 1 < block.body.length; i++) {
      if (block.body.charAt(i) === '/' && block.body.charAt(i + 1) === '{') {
        i++;
        isFind = true
        str += '<var><span style="color:#ec407a;font-weight:bold;font-style:italic;">'
        continue;
      } else if (isFind && block.body.charAt(i) === '}') {
        isFind = false
        str += '</span></var>'
        continue;
      }
      str += block.body.charAt(i)
    }
    // block.body = block.body
    //   .replace(/{/gi, '<var><span style="color:#ec407a;font-weight:bold;font-style:italic;">')
    //   .replace(/}/gi, '</span></var>')
  } else {
    block.body = block.body
      .replace(/{/gi, '<var><span style="color:#ec407a;font-weight:bold;font-style:italic;">{')
      .replace(/}/gi, '}</span></var>')
  }
  
  return '<div class="tab' + (isActive ? ' active' : '') + '" data-codetab="' + i + '">' +
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
