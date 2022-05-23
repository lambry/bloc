<?php
/**
 * Handle all grid related logic.
 */

namespace Lambry\Bloc\Blocks;

defined('ABSPATH') || exit;

class Grid
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
		register_block_type('bloc/grid');
		register_block_type('bloc/cell');
	}
}
