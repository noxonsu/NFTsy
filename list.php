<?php 

if ( isset( $_GET['token_id']{1} ) ) $nft_id = (int) $_GET['token_id'];
$nft_current_page  = get_permalink( get_the_ID() );

if (!isset($nft_id)) {
	$args = array(
        'post_type' => 'nft',
        'posts_per_page' => -1
    );
	$query = new WP_Query($args);
	if ($query->have_posts() ) : 
		
		while ( $query->have_posts() ) : $query->the_post();
			$nft_link_id = add_query_arg( 'token_id', get_the_id() , $nft_current_page ) ;
			$nft_link = get_the_title();
			
			echo '<a class="nftitem" href='.$nft_link_id.'><img src="'. get_the_title() . '"></a>';
		endwhile;
		
		wp_reset_postdata();
	endif;
} else {
	?>THIS IS VIEW NFT ID: <?php echo $nft_id; ?>
	<div id="root"></div>
	<script>
	window.init({ networkType: '<?php esc_html_e(get_option("nft_networkName"),"nft"); ?>', page: 'view', tokenId: <?php echo $nft_id; ?> })
	</script><?
}

?>
