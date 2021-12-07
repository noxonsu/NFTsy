<?php get_header(); ?>
<div id="v-app">
    <Token-Start-Page :post="<?php  echo esc_attr( get_the_ID());?>" />
</div>
<?php   get_footer(); ?>
