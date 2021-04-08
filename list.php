<style>
img.nft_img {
    max-width: 320px;
    max-height: 320px;
}

.nftitem_container {
    width: 320px;
    height: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nft_item {
    padding: 16px;
    margin-right: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 352px;
    height: fit-content;

    box-shadow: 0px 4px 16px rgb(0 0 0 / 8%), 0px 1px 4px rgb(0 0 0 / 8%);
    background: #fff;
    border-radius: 4px;
}
.elementor-text-editor.elementor-clearfix {
    display: flex;
    flex-wrap: wrap;
}

.nft_title {
    font-size: 16px;
    padding-bottom: 5px;
    height: 29px;
    width: 320px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.nft_price {
    font-size: 16px;
}
</style><?php

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
			<div class='nftitem_container'>
                <a class="nftitem" href='<? echo $nft_link_id ?>'>
                    <img class='nft_img' src="<? echo get_the_content() ?>">
                </a>
            </div
			<div class='nft_title'><? echo get_the_title() ?></div>
			</div>
			<?php
			echo '';
		endwhile;
		
		wp_reset_postdata();
	endif;
} else {
	
	$args = array(
        'p' => $nft_id,
		'post_type'=> 'nft'
    );
	$query = new WP_Query($args);
	
	if ($query->have_posts() ) { $query->the_post();
	?>
	<div id="root"></div>
	<script>
	window.nftConfig = { networkType: '<?php esc_html_e(get_option("nft_networkName"),"nft"); ?>', page: 'view', tokenId: <?php echo $nft_id; ?>, title: "<?php echo get_the_title(); ?>" }
	</script><?
	} else {
		?>Not found<?
	}
}

?>
