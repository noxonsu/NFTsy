<?php

namespace NFTCY;
defined( 'ABSPATH' ) || exit;


abstract class ControllerShortCode {

	protected $view;
	protected $actions;
	protected $filter;
	public $shortcode;

	public function __construct() {
		$this->view = new View();
		add_shortcode( $this->shortcode, [ $this, 'shortcodeAction' ] );
		$this->handle();

		if ( is_array( $this->actions ) ) {
			foreach ( $this->actions as $k => $action ) {
				add_action( $k, [ $this, $action ] );
			}
		}
		//var_dump($this->shortcode);


	}


	abstract public function handle();
	abstract public function shortcode($atts, $content );

}