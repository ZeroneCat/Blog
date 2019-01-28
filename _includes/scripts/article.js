(function() {
  var SOURCES = window.TEXT_VARIABLES.sources;
  window.Lazyload.js(SOURCES.jquery, function() {
    $(function() {
      var $this ,$scroll;
      var $articleContent = $('.js-article-content');
      var hasSidebar = $('.js-page-root').hasClass('layout--page--sidebar');
      var scroll = hasSidebar ? '.js-page-main' : 'html, body';
      $scroll = $(scroll);

      $articleContent.find('.highlight').each(function() {
        $this = $(this);
        $this.attr('data-lang', $this.find('code').attr('data-lang'));
      });
      $articleContent.find('h2[id]').each(function() {
        $this = $(this);
        $this.append($('<a class="anchor-ht d-print-none" aria-hidden="true"></a>').html('<i class="fas ht-anchor">#</i>'));
      });
      $articleContent.find('h3[id]').each(function() {
        $this = $(this);
        $this.append($('<a class="anchor-ht d-print-none" aria-hidden="true"></a>').html('<i class="fas ht-anchor">##</i>'));
      });
      $articleContent.find('h1[id], h4[id], h5[id], h6[id]').each(function() {
        $this = $(this);
        $this.append($('<a class="anchor d-print-none" aria-hidden="true"></a>').html('<i class="fas fa-anchor"></i>'));
      });
      $articleContent.on('click', '.anchor', function() {
        $scroll.scrollToAnchor('#' + $(this).parent().attr('id'), 400);
      });
      $articleContent.on('click', '.anchor-ht', function() {
        $scroll.scrollToAnchor('#' + $(this).parent().attr('id'), 400);
      });
    });
  });
})();