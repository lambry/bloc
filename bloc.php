<?php
/**
 * Plugin Name: Bloc
 * Plugin URI: https://github.com/lambry/bloc/
 * Description: A few useful WordPress blocks.
 * Version: 0.1.0
 * Author: Lambry
 * Author URI: https://lambry.com/
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: bloc
 */

namespace Lambry\Bloc;

defined('ABSPATH') || exit;

define('BLOC_DIR', plugin_dir_path(__FILE__));
define('BLOC_URL', plugin_dir_url(__FILE__));
define('BLOC_BLOCKS_DIR', plugin_dir_path(__FILE__) . 'src/blocks/');
define('BLOC_BLOCKS_URL', plugin_dir_url(__FILE__) . 'src/blocks/');

class Bloc
{
	private $editor = null;
	private $frontend = null;

	/**
     * Setup and add actions.
     */
    public function __construct()
    {
		$this->init();

		add_action('enqueue_block_editor_assets', [$this, 'editor']);
		add_action('enqueue_block_assets', [$this, 'mixed']);
		add_action('wp_enqueue_scripts', [$this, 'frontend']);
	}

	/**
	 * Include required files.
	 */
	public function init() : void
	{
		$this->editor = include plugin_dir_path(__FILE__) . 'build/editor/editor.asset.php';
		$this->frontend = include plugin_dir_path(__FILE__) . 'build/frontend/frontend.asset.php';

		$this->include('options/options', 'Options');
		$this->include('blocks/grid/grid', 'Blocks\Grid');
		$this->include('blocks/posts/posts', 'Blocks\Posts');
		$this->include('blocks/slider/slider', 'Blocks\Slider');
	}

	/**
	 * Enqueue editor assets.
	 */
	public function editor() : void
	{
		wp_enqueue_style('bloc-editor-style', BLOC_URL . 'build/editor/editor.css', [], $this->editor['version']);
		wp_enqueue_script('bloc-editor-script', BLOC_URL . 'build/editor/editor.js', $this->editor['dependencies'], $this->editor['version']);
	}

	/**
	 * Enqueue editor/frontend assets.
	 */
	public function mixed() : void
	{
		wp_enqueue_style('bloc-mixed-style', BLOC_URL . 'build/editor/style-editor.css', [], $this->editor['version']);
	}

	/**
	 * Enqueue frontend assets.
	 */
	public function frontend() : void
	{
		wp_enqueue_style('bloc-frontend-style', BLOC_URL . 'build/frontend/style-frontend.css', [], $this->frontend['version']);
		wp_enqueue_script('bloc-frontend-script', BLOC_URL . 'build/frontend/frontend.js', [], $this->frontend['version'], true);
	}

	/**
     * Include the file.
     */
    private function include(string $file, string $class) : void
    {
		require_once BLOC_DIR . "src/{$file}.php";

        $instance = __NAMESPACE__ . '\\' . $class;

        (new $instance)->setup();
    }
}

new Bloc();
