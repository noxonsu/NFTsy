<?php
defined( 'ABSPATH' ) || exit;

spl_autoload_register( function ( $class ) {

	if ( strpos( $class, 'NFT' ) !== false ) {
		require __DIR__ . '/../' . str_replace( [ '\\', 'NFT' ], [ '/', 'App' ], $class ) . '.php';

	}
} );

foreach ( glob( __DIR__ . '/Controllers/*.php' ) as $file ) {
	$class = '\NFT\Controllers\\' . basename( $file, '.php' );
	if ( class_exists( $class ) ) {
		$obj = new $class;
	}

}