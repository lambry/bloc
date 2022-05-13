<?php
/**
 * Handle all options related logic.
 */

namespace Lambry\Bloc;

defined('ABSPATH') || exit;

class Options
{
	/**
     * Hande setup.
     */
    public function setup()
    {
		add_action('rest_api_init', [$this, 'endpoints']);
		add_filter('render_block', [$this, 'block'], 10, 2);
	}

	/**
	 * Setup endpoints.
	 */
	public function endpoints() : void
	{
		register_rest_route('bloc', '/options', [
			'methods'  => \WP_REST_Server::READABLE,
			'permission_callback' => fn() => current_user_can('edit_posts'),
			'callback' => [$this, 'options']
		]);
	}

	/**
	 * Get all cachable options.
	 */
	public function options() : array
	{
		$roles = array_merge(wp_roles()->role_names, [
			'logged-in' => 'Logged In',
			'logged-out' => 'Logged Out'
		]);

		return [
			'roles' => array_map(fn($name, $slug) => [
				'value' => $slug,
				'label' => $name
			], $roles, array_keys($roles))
		];
	}

	/**
	 * Filter block rendering.
	 */
	public function block(string $content, array $block) : string
	{
		if (isset($block['attrs']['restrictTo']) && $block['attrs']['restrictTo']) {
			$user = wp_get_current_user();
			$roles = (array) $block['attrs']['restrictTo'];

			// Show block for logged out user
			if (! $user->roles && in_array('logged-out', $roles)) {
				return $content;
			}

			// Show block for logged in users
			if ($user->roles && in_array('logged-in', $roles)) {
				return $content;
			}

			// Show block for appropriate roles
			if ($roles && array_intersect($user->roles, $roles)) {
				return $content;
			}

			return '';
		}

		return $content;
	}
}
