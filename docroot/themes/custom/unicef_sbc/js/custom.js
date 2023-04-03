/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.unicef_sbc = {
    attach: function(context, settings) {

      $(document).ready(function(){
          //Create page - progressor active state
          $(document).on("click",".progressbar .progress-text li.step",function() {
              $('.progressbar .progress-text li.step').removeClass('active');
              $(this).addClass('active');
          })
          //Create page - Steps
          $(".create-page .item-list").each(function(i){
                  $(this).prepend($("<div class='steps'>Step - "+(i+1)+"</div>"));       
          });
      
          //Create page - Click the progressor will move to respective block
          $(".create-page .item-list .progress-link").click(function(e) {  
              e.preventDefault();   
              var dest = $(this).attr('href');
              $('html,body').animate({ scrollTop: $(dest).offset().top -130}, 'slow'); 
          });
      
          //homepage menu category-list accordian
          if ($(window).width() < 768) {
              $('.home-page-category-list .item-list h3').click(function() {
                $(this).toggleClass('active');
                $(this).next().slideToggle('500').parent().siblings().children('ul').slideUp();
              });
              $('.term-filter-block .view-header').click(function() {
                $(this).toggleClass('active');
                $(this).next().slideToggle('500').parents('.views-element-container').siblings().children().find('.view-content').slideUp();
              });
          }
          
          //Social behaviour  change -- character limit set and shown popup
          var maxLength =315;
          $(".social-behaviour-change-content p span").each(function(){
              var myStr = $(this).text();
              if($.trim(myStr).length > maxLength){
                  var newStr = myStr.substring(0, maxLength);
                  $(this).empty().html(newStr);
                  $(this).append('<span class="Readmore"><a data-bs-toggle="modal" data-bs-target="#exampleModal" href="javascript:;" >Read More...</a>');
                  $(this).append('<div class="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button><div class="social-text">' + myStr + '</div></div></div></div>');
              }
          });

          //Homepage custom dropdown -- Looking for block
          $('.looking-for-list .looking-for-select').click(function() {
            $(this).next().slideToggle('500');
         });
        
        //Added active classname
        var current = window.location.pathname
        if (current == '/vision'){
          $('body').addClass('vision-listing-page');
        }else if(current == '/understand'){
          $('body').addClass('understand-listing-page');
        }else if(current == '/do'){
          $('body').addClass('do-listing-page');
        }else if(current == '/create'){
          $('body').addClass('create-listing-page');
        }else if(current == '/explore'){
          $('body').addClass('explore-listing-page');
        }

        //filter page trigger click
        $(document).on("click",".listing-filter-block .block-views-blocktaxonomy-list-block-6 li a.sub-catrgory",function(e) {
            e.preventDefault();
            var getid=$(this).attr('id');
            $(this).toggleClass('bef-link--selected').parents('li').siblings().children().find('a').removeClass('bef-link--selected');
            if(!$(this).hasClass('bef-link--selected')){
                $('#edit-field-sub-category-target-id-all').trigger('click');
            }else{
                $('#edit-field-sub-category-target-id-' + getid).trigger('click');
            
            }
        })
      });

    }
  };

})(jQuery, Drupal);
