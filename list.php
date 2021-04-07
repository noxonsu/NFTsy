<style></style><?php 

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
			?>
			<div class='nft_item'>
			<a class="nftitem" href='<? echo $nft_link_id ?>'>
				<img class='nft_img' src="<? echo get_the_content() ?>">
			</a>
			<div class='nft_title'><? echo get_the_title() ?></div> <div class='nft_price' rel="<? echo get_the_id(); ?>"> 1 ETH</div>
			</div>
			<?php
			echo '';
		endwhile;
		
		wp_reset_postdata();
	endif;
} else {
	?>THIS IS VIEW NFT ID: <?php echo $nft_id; ?>
	<div id="root"></div>
	<script>
	window.nftConfig = { networkType: '<?php esc_html_e(get_option("nft_networkName"),"nft"); ?>', page: 'view', tokenId: <?php echo $nft_id; ?> }
	</script><?
}

?>
