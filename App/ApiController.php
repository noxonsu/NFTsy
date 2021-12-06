<?php

namespace RARIBLE;


abstract class  ApiController extends Controller
{


    protected function handle()
    {

        add_action('wp_ajax_'.$this->getAction(), [$this, 'actionApi'], 500);
        add_action('wp_ajax_nopriv_'.$this->getAction(), [$this, 'actionApi'],
            500);
    }

    /**
     * return prefixed action with underscores in lower case
     *
     * @return string
     */
    private function getAction()
    {
        $className = get_class($this);

        $s2 = strtolower(preg_replace("/(?<=[a-zA-Z])(?=[A-Z])/", "_",
            $className));
        $s2 = explode('\\', $s2);

        return 'nftcy _'.$s2[count($s2) - 1];
    }

    public function actionApi(){
        $this->action();
        wp_die();
    }
    abstract public function action();


}
