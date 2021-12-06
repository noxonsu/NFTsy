<?php

namespace NFTCY\Controllers\Api;

use NFTCY\ApiController;

class  CheckNftPost extends ApiController
{

    public function action()
    {

        dd(get_post_meta(45,'nftcy_tx',1));

    }


}
