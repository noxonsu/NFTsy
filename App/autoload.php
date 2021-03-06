<?php
defined( 'ABSPATH' ) || exit;


spl_autoload_register( function ( $class ) {

	if ( strpos( $class, 'NFTCY' ) !== false ) {
		require __DIR__ . '/../' . str_replace( [ '\\', 'NFTCY' ], [ '/', 'App' ], $class ) . '.php';

	}
} );

nftcy_rsearch(__DIR__ . '/Controllers/', '#.*php#');
function nftcy_rsearch($folder, $pattern) {

    $dir = new RecursiveDirectoryIterator($folder);
    $ite = new RecursiveIteratorIterator($dir);
    $files = new RegexIterator($ite, $pattern, RegexIterator::GET_MATCH);

    foreach($files as $file) {
        preg_match('#App[\/,//]Controllers[\\,//](.*)#',$file[0],$math);

        if(isset($math[1])){
            $class =  '\NFTCY\Controllers\\' . str_replace(['.php','/'],['','\\'], $math[1]);


            if ( class_exists( $class ) ) {

                new $class;
            }
        }else{
            preg_match('#App\/Controllers\\\(.*)#',$file[0],$math2);

            if(isset($math2[1])){
                $class =  '\NFTCY\Controllers\\' . str_replace(['.php','/'],['','\\'], $math2[1]);


                if ( class_exists( $class ) ) {

                    new $class;
                }
            }
        }


    }

}