;(function ($) {
    'use strict';
  
    $(document).ready(async function () {

        const $input = $('#search');
        const $container = $('#sparkbook-response');

        const question = $input.val();

        if (!question) {
            return
        }

        $container.append('<h3 class="search__title" style="text-align:center;">Thinking...</h3>');
        $container.append('<img style="width:50%;margin:auto;" src="images/spark-loader.svg" />')
        $input.prop('disabled', true);

        const response = await fetch(`http://localhost:3000/ask?question=${encodeURIComponent(question)}`, );
        const data = await response.json();
        
        $input.prop('disabled', false);
        $container.empty();

        $container.append('<h3 class="search__title">Your quick answer</h3>');
        $container.append(data.answer);
        $container.append('<h4 class="search__page-title--category">Learn more</h4>');
        $container.append(`<ol>${data.sources.map(({title, url}) => `<li><a href="${url}">${title}</a></li>`).join('')}</ol>`);
    });
  })(jQuery);
