jQuery(document).ready(function ($) {
  "use strict";

  /**
   * Select/Upload icon
   */
  $('body').on('click', '.rarible-input-icon', function(e){
    e.preventDefault();

    var button = $(this),
        custom_uploader = wp.media({
          title: '',
          library : {
            type : 'image'
          },
          button: {
            text: 'insert logo'
          },
          multiple: false
        }).on('select', function() {
          var attachment = custom_uploader.state().get('selection').first().toJSON();
          $('.js-rarible-load-icon').val( attachment.url );
        })
        .open();
  });
  $('body').on('click', '.rarible-input-icon2', function(e){
    e.preventDefault();

    var button = $(this),
        custom_uploader = wp.media({
          title: '',
          library : {
            type : 'image'
          },
          button: {
            text: 'insert logo'
          },
          multiple: false
        }).on('select', function() {
          var attachment = custom_uploader.state().get('selection').first().toJSON();
          $('.js-rarible-load-icon2').val( attachment.url );
        })
        .open();
  });
})


