<?php
/** * Template Name: add places
 * Preview:
 * * */
// delete places


if ( is_user_logged_in() || NFT_ADDUSER > 0) {
		
		
		if (NFT_ADDUSER > 0) {$nft_autor = NFT_ADDUSER;} else { get_current_user_id(); }
		
		if (isset($_POST['nft_new_url'])) {

			// Create post object
			$nft_new_item = array(
			  'post_title'    => wp_strip_all_tags( $_POST['nft_new_text'] ),
			  'post_content'  => wp_strip_all_tags($_POST['nft_new_url']),
			  'post_status'   => 'publish',
			  
			  'post_author'   => $nft_autor,
			  'post_type' => 'nft'
			);
			 
			// Insert the post into the database
			$nft_new_id = wp_insert_post( $nft_new_item );
			$nft_new_edit = add_query_arg( 'token_id', $nft_new_id , get_permalink( get_the_ID() ) ) ;
			?>
			<script>window.location='<?php echo $nft_new_edit; ?>'</script>
			<?
		}
		
		

		$place_title = '';
		$nft_id = '';
		
		if ( isset($nft_new_id)) $nft_id = $nft_new_id;
		if ( isset( $_GET['token_id']{1} ) ) $nft_id = (int) $_GET['token_id'];
		
		
		if ( $nft_id ) {

			
			?>
			<div id="root"></div>
			<script>
			
			window.nftConfig = { networkType: '<?php esc_html_e(get_option("nft_networkName"),"nft"); ?>', page: "add", tokenId: <?php echo $nft_id; ?>, newUrl:'<?php echo get_post_field('post_content', $nft_id); ?>',}
			</script>
			<?php
		
		} else {
			
			?>
			<form action="" method="post">
			  <?php echo esc_html__( 'Provide image URL of new NFT', 'nft' );?>:
			  <input type="text" required name="nft_new_url" value="https://"> 
			  <Br><Br><?php echo esc_html__( 'Description:', 'nft' );?>:
			  <input type="text" name="nft_new_text" value="">
			  <Br><Br><input type="submit" value="Submit">
			</form>
			<?php
			
		} 
	} else {
		echo esc_html__( 'You need to register', 'nft' );
		echo "<br>";
		echo do_shortcode( '[ethpress_login_button]' );
	}
	
?>
