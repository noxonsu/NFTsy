<style type="text/css" type="scope">
    .nft-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        background-color: rgb(255 255 255 / 80%);
    }

    .nft-overlay.visible {
        display: block;
    }

    .nft-loader {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 40px;
        height: 40px;
        background-color: #313131;
        animation: rectangle 1.5s infinite ease-in-out;
    }

    @keyframes rectangle {
        0% {
            transform:perspective(12rem) rotateX(0deg) rotateY(0deg)
        }
        50% {
            transform:perspective(12rem) rotateX(-180.1deg) rotateY(0deg)
        }
        100% {
            transform:perspective(12rem) rotateX(-180deg) rotateY(-179.9deg)
        }
    }
</style>

<div class="wrap">
    <div class="welcome-panel">
        <h2><?php esc_html_e('Settings','nftcy'); ?></h2>
        <?php esc_html_e('First of all please','nftcy'); ?>
        <a href="update-core.php?force-check=1"><?php esc_html_e('check for updates','nftcy'); ?></a>.
        <?php esc_html_e('How to use? Add [nftcy_nft_addform] to a page where to show "add" form. Add [nftcy_nft_view] to a page where to show the catalog:','nftcy'); ?><Br>
        <br><br>
        <h2><?php esc_html_e('General settings', 'nftcy'); ?></h2>
        <div class="welcome-panel-column-container nft-panel-tab panel-tab-active" id="nft-tab-1">
            <div class="nft-shortcode-panel-row">
                <form action="#" method="post" class="wp-nft-widget-form">
                    <table class="form-table">
                        <tbody>

                        <tr>
                            <th scope="row">
                                <label><?php esc_html_e('Newtwork ', 'nftcy'); ?></label>
                            </th>
                            <td>
                                <div class="nft-form-inline"><?php
                                    $nft_network = get_option('nftcy_nft_networkName','ropsten');
                                    ?>
                                    <select
                                            name="nftcy_nft_networkName">
                                        <option <?php selected($nft_network,'ropsten' ) ;  ?>>ropsten</option>
                                        <option <?php selected($nft_network,'mainnet' ) ;  ?>  >mainnet</option>
                                    </select>
                                    <br>
                                    <?php esc_html_e('Ropsten or Mainnet. We recommend to test on testnet with testnet tokens before launch', 'nftcy'); ?>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label><?php esc_html_e('Collection ', 'nftcy'); ?></label>
                            </th>
                            <td>
                                <div class="nft-form-inline"><?php
                                    $nft_collection = get_option('nftcy_nft_collection','0xB0EA149212Eb707a1E5FC1D2d3fD318a8d94cf05');
                                    ?>
                                    <input  class="regular-text code" name="nftcy_nft_collection" value="<?php  echo  esc_attr($nft_collection); ?>">

                                    <br>
                                    <?php esc_html_e('Mainnet
Asset Contract ERC721 0xF6793dA657495ffeFF9Ee6350824910Abc21356C', 'nftcy'); ?>
                                    <br>
                                    <?php esc_html_e('Ropsten
Asset Contract ERC721 0xB0EA149212Eb707a1E5FC1D2d3fD318a8d94cf05', 'nftcy'); ?>
                                </div>
                            </td>
                        </tr>
   </tr>
                        <tr>
                            <th scope="row">
                                <label><?php esc_html_e('Enable Bid ', 'nftcy'); ?></label>
                            </th>
                            <td>
                                <div class="nft-form-inline"><?php

                                    $nft_bid = get_option('nftcy_nft_bid',0);
                                    ?>
                                    <input type="checkbox"  class="regular-text code" name="nftcy_nft_bid"
                                           value="1" <?php checked($nft_bid, 1) ?>>


                                </div>
                            </td>
                        </tr>



                        <tr>
                            <th scope="row"></th>
                            <td>
                                <input type="submit" name="mcwallet-add-token"
                                       class="button button-primary mcwallet-add-token"
                                       value="<?php esc_attr_e('Save', 'nftcy'); ?>">
                                <span class="spinner"></span>
                                <br>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>

            </div>
        </div>
    </div>

    <div id="nft_loaderOverlay" class="nft-overlay">
        <div class="nft-loader"></div>
    </div>
</div>

