<?php

namespace RARIBLE\Controllers\Api;

use RARIBLE\ApiController;

class  CheckNftPost extends ApiController
{

    public function action()
    {

        dd(get_post_meta(45,'rarible_tx',1));

    }


}
