<?php

namespace RARIBLE\Controllers\Api;

use RARIBLE\ApiController;

class  CreateNftPost extends ApiController
{
    private $postId;
    private $mediaId = false;
    private $salt = false;

    public function action()
    {
        $this->salt = md5(time());
        $this->validation();

        $this->createPost();
        $this->uploadMedia();
        set_post_thumbnail($this->postId, $this->mediaId);
        $this->updatePostMeta();
        $this->sendSuccessText();
    }

    private function createPost()
    {
        $my_post      = array(
            'post_title' => sanitize_text_field($_POST['title']),
            'post_content' => sanitize_text_field($_POST['description']),
            'post_status' => $this->getPostStatus(), //change draft to publish
            'post_author' => get_current_user_id(),
            'post_type' => 'nft',

        );
        $this->postId = wp_insert_post($my_post);
    }

    private function sendSuccessText()
    {
        $return = array(
            'success' => true,
            'message' => esc_html('Saved', 'rarible'),
            'ID'      => $this->postId,
            'img' => wp_get_attachment_image_url( $this->mediaId, 'full'),
            'mediaId' =>  $this->mediaId,
            'salt' =>  $this->salt
        );

        wp_send_json($return);
    }

    private function validation()
    {
        $errors = [];
        if ( ! isset($_POST['title'][2])) {
            $errors['title'] =  esc_html('You must provide a title', 'rarible');
        }
        if ( ! isset($_POST['description'][2])) {
            $errors['description'] =  esc_html('You must provide a description',
                    'rarible');
        }
        if ( ! isset($_POST['price'])) {
            $errors[   'price'] =  esc_html('You must provide a price', 'rarible');
        }
        if ( ! $_FILES) {
            $errors[   'files'] =  esc_html('You must provide a picture', 'rarible');
        }

        if (count($errors) > 0) {
            $return = array(
                'errors' => $errors,
            );

            wp_send_json($return, 403);
            die;
        }


    }

    private function getPostStatus(): string
    {
        $post_status = 'draft';
        if (current_user_can('administrator')) {
            $post_status = 'publish';
        }

        return $post_status;
    }

    private function uploadMedia()
    {

        if ($_FILES['file'] ?? false) {
            $mediaId = media_handle_upload('file', 0);
            $this->mediaId = $mediaId;
        }


    }

    private function updatePostMeta()
    {
        update_post_meta($this->postId, '_salt', ($this->salt));
        update_post_meta($this->postId, 'price',
            sanitize_text_field($_POST['price'] ?? 0));
        update_post_meta($this->postId, 'royalties',
            sanitize_text_field($_POST['royalties'] ?? ''));
        update_post_meta($this->postId, 'properties',
            sanitize_text_field($_POST['properties'] ?? ''));
    }
}
