<?php
/**
 * Handle all slider related logic.
 */

namespace Lambry\Bloc\Blocks;

defined('ABSPATH') || exit;

class Slider
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
		register_block_type('bloc/slider');
		register_block_type('bloc/slide');
	}
}
