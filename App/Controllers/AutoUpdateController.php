<?php


namespace RARIBLE\Controllers;


class AutoUpdateController {

	const INFO_URL = 'https://rarible.wpmix.net/info.json';
	const PLUGIN_SLUG = 'nftcy';
	const TRANSIENT_SLUG = 'rarible_upgrade_plugin';

	public function __construct() {
		add_action('plugins_api', function($res, $action, $args) {
			return  $this->setUpdateInfo($res, $action, $args);
		},200,3);
		add_filter( 'site_transient_update_plugins', [ $this, 'pushUpdate' ] );
		add_filter( 'transient_update_plugins', [ $this, 'pushUpdate' ] );
		add_action( 'upgrader_process_complete', [ $this, 'afterUpdate', 10, 2 ] );
		add_action( 'current_screen', [ $this, 'updateForceCheck' ] );
	}


	/**
	 * @param $res
	 * @param $action
	 * @param $args
	 *
	 * @return false|\stdClass
	 */
	public function setUpdateInfo( $res, $action, $args) {


		// return false if this is not about getting plugin information.
		if ( 'plugin_information' !== $action ) {
			return false;
		}

		// return false if it is not our plugin.
		if ( self::PLUGIN_SLUG !== $args->slug ) {
			return false;
		}
		// trying to get from cache first.
		if ( false == $remote = get_transient( self::TRANSIENT_SLUG ) ) {

			// info.json is the file with the actual plugin information on your server.
			$remote = wp_remote_get( self::INFO_URL, array(
				'timeout' => 10,
				'headers' => array(
					'Accept' => 'application/json',
				),
			) );


			if ( ! is_wp_error( $remote ) && isset( $remote['response']['code'] ) && $remote['response']['code'] == 200 && ! empty( $remote['body'] ) ) {
				set_transient( self::TRANSIENT_SLUG, $remote, HOUR_IN_SECONDS );
			}

		}
		if ( ! is_wp_error( $remote ) && isset( $remote['response']['code'] ) && $remote['response']['code'] == 200 && ! empty( $remote['body'] ) ) {


			$remote = json_decode( $remote['body'] );

			$res    = new \stdClass();

			$res->name           = $remote->name;
			$res->slug           = self::PLUGIN_SLUG;
			$res->version        = $remote->version;
			$res->tested         = $remote->tested;
			$res->requires       = $remote->requires;
			$res->author         = 'Victor Lerner';
			$res->author_profile = '';
			$res->download_link  = $remote->download_url;
			$res->trunk          = $remote->download_url;
			$res->requires_php   = $remote->requires_php;
			$res->last_updated   = $remote->last_updated;
			$res->sections       = array(
				'description'  => $remote->sections->description,
				'installation' => $remote->sections->installation,
				'changelog'    => $remote->sections->changelog,
			);

			// in case you want the screenshots tab, use the following HTML format for its content:
			// <ol><li><a href="IMG_URL" target="_blank"><img src="IMG_URL" alt="CAPTION" /></a><p>CAPTION</p></li></ol>
			if ( ! empty ( $remote->sections->screenshots ) ) {
				$res->sections['screenshots'] = $remote->sections->screenshots;
			}

			return $res;

		}


		return false;
	}

	/**
	 * @param $transient
	 *
	 * @return mixed
	 */
	public function pushUpdate($transient){

		if ( empty( $transient->checked ) ) {
			return $transient;
		}


		// trying to get from cache first, to disable cache comment 10,20,21,22,24.
		if ( false == $remote = get_transient( self::TRANSIENT_SLUG ) ) {

			// info.json is the file with the actual plugin information on your server.

			$remote = wp_remote_get( self::INFO_URL,
				array(
					'timeout' => 10,
					'headers' => array(
						'Accept' => 'application/json',
					),
				)
			);


			if ( ! is_wp_error( $remote ) && isset( $remote['response']['code'] ) && $remote['response']['code'] == 200 && ! empty ( $remote['body'] ) ) {
				set_transient( self::TRANSIENT_SLUG, $remote, 43200 ); // 12 hours cache
			}
			if ( ! is_wp_error( $remote )  && $remote ) {


                $remote = json_decode( $remote['body'] );

                // your installed plugin version should be on the line below! You can obtain it dynamically of course
                if ( $remote && version_compare( RARIBLE_VER, $remote->version, '<' ) && version_compare( $remote->requires, get_bloginfo('version'), '<' ) ) {
                    $res                               = new \stdClass();
                    $res->slug                         = self::PLUGIN_SLUG;
                    $res->plugin                       = self::PLUGIN_SLUG . '/' . self::PLUGIN_SLUG . '.php';
                    $res->new_version                  = $remote->version;
                    $res->tested                       = $remote->tested;
                    $res->package                      = $remote->download_url;
                    $transient->response[$res->plugin] = $res;

                }
            }
		}


		return $transient;
	}


	/**
	 * @param $upgrader_object
	 * @param $options
	 */
	public function afterUpdate($upgrader_object, $options){
		if ( $options['action'] == 'update' && $options['type'] === 'plugin' ) {
			// just clean the cache when new plugin version is installed.
			delete_transient( self::TRANSIENT_SLUG );
		}
	}

	/**
	 *
	 */
	public function updateForceCheck(){
		if ( ! isset( $_GET['force-check'] ) ) {
			return;
		}
		$current_screen = get_current_screen();
		if ( 'update-core' === $current_screen->id ) {
			delete_transient( self::TRANSIENT_SLUG );
		}
	}
}