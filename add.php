<?php
/** * Template Name: add places
 * Preview:
 * * */
// delete places


if ( is_user_logged_in() ) {

		if (isset($_POST['nft_new_url'])) {
			// Create post object
			$nft_new_item = array(
			  'post_title'    => wp_strip_all_tags( $_POST['nft_new_url'] ),
			  'post_content'  => esc_url($_POST['nft_new_url']),
			  'post_status'   => 'publish',
			  
			  'post_author'   => get_current_user_id(),
			  'post_type' => 'nft'
			);
			 
			// Insert the post into the database
			$nft_new_id = wp_insert_post( $nft_new_item );
			$nft_new_edit = add_query_arg( 'token_id', $nft_new_id , get_permalink( get_the_ID() ) ) ;
			echo '<a href="'.$nft_new_edit.'">'.$nft_new_edit.'</a>
			<br>';
			
		}

		$place_title = '';
		$nft_id = '';
		if ( isset( $_GET['token_id']{1} ) ) {

			$nft_id = sanitize_text_field( (int) $_GET['token_id'] );
			// only user why can edit places can edit it
			if ( !current_user_can( "edit_post", $nft_id ) ) {
				$nft_id = '';
			}
			$nft_title = get_the_title( $nft_id );
			$city2_postplace = get_post( $nft_id );
			
			if ( isset( $_GET['delete_places']{1} ) ) {
				wp_delete_post( $nft_title );
				wp_safe_redirect( esc_url( home_url( '/' ) ) );
			}
			
			?>
			<div id="root"></div>
			<script>
			alert("<?php echo get_post_field('post_content', $nft_id); ?>");
			window.init({ networkType: '<?php esc_html_e(get_option("nft_networkName"),"nft"); ?>', tokenId: <?php echo $nft_id; ?> })
			</script>
			<?php
		
		} else {
			echo esc_html__( 'Provide image URL of new NFT', 'nft' );
			?>
			<form action="" method="post">
			  <input type="text" name="nft_new_url" value="https://">
			  <input type="submit" value="Submit">
			</form>
			<?php
			//echo esc_html__( 'You need to register', 'nft' ); esc_url( add_query_arg( 'token_id', '1', get_permalink( get_the_ID() ) ) ) );
		} 
	} else {
		echo esc_html__( 'You need to register', 'nft' );
		echo "<br>";
		echo do_shortcode( '[ethpress_login_button]' );
	}
	
?>
