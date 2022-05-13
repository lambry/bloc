<?php
/**
 * Handle all content related logic.
 */

namespace Lambry\Bloc\Blocks;

defined('ABSPATH') || exit;

class Content
{
	/**
     * Handle setup.
     */
    public function setup()
    {
		add_action('init', [$this, 'register']);
	}

	/**
	 * Register the blocks.
	 */
	public function register() {
		register_block_type('bloc/content');
		register_block_type('bloc/content-cell');
	}
}
