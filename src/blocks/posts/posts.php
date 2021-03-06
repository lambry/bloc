<?php
/**
 * Handle all posts related logic.
 */

namespace Lambry\Bloc\Blocks;

defined('ABSPATH') || exit;

class Posts
{
	public $comparators = [
		'is' => '=', 'not' => '!=', 'lt' => '<', 'gt' => '>', 'lte' => '<=', 'gte' => '>='
	];

	/**
     * Handle setup.
     */
    public function setup()
    {
		add_action('init', [$this, 'block']);
		add_action('rest_api_init', [$this, 'endpoints']);
		add_action('bloc/posts/item', [$this, 'item']);
	}

	/**
	 * Register block.
	 */
	public function block()
	{
		register_block_type('bloc/posts', [
			'attributes' => $this->attributes(),
			'render_callback' => [$this, 'render']
		]);
	}

	/**
	 * Setup endpoints.
	 */
	public function endpoints() : void
	{
		register_rest_route('bloc/posts', '/search', [
			'methods'  => \WP_REST_Server::READABLE,
			'sanitize_callback' => 'sanitize_text_field',
			'permission_callback' => fn() => current_user_can('edit_posts'),
			'callback' => [$this, 'search']
		]);

		register_rest_route('bloc/posts', '/taxonomies', [
			'methods'  => \WP_REST_Server::READABLE,
			'sanitize_callback' => 'sanitize_text_field',
			'permission_callback' => fn() => current_user_can('edit_posts'),
			'callback' => [$this, 'taxonomies']
		]);

		register_rest_route('bloc/posts', '/terms', [
			'methods'  => \WP_REST_Server::READABLE,
			'sanitize_callback' => 'sanitize_text_field',
			'permission_callback' => fn() => current_user_can('edit_posts'),
			'callback' => [$this, 'terms']
		]);

		register_rest_route('bloc/posts', '/fields', [
			'methods'  => \WP_REST_Server::READABLE,
			'permission_callback' => fn() => current_user_can('edit_posts'),
			'callback' => [$this, 'fields']
		]);
	}

	/**
	 * Get all attributes.
	 */
	private function attributes() : array
	{
		$attrs = file_get_contents(BLOC_BLOCKS_URL . 'posts/src/editor/attributes.json', __FILE__);

		return array_merge([
			'align' => ['type' => 'string'],
			'className' => ['type' => 'string', 'default' => '']
		], json_decode($attrs, true));
	}

	/**
	 * Get posts and render template.
	 */
	public function render(array $attributes) : string
	{
		if (isset($attributes['align'])) {
			$attributes['className'] .= " align{$attributes['align']}";
		}

		set_query_var('query', $this->query($attributes));
		set_query_var('attributes', $attributes);

		return $this->template($attributes['display']);
	}

	/**
	 * Render template for an individual item.
	 */
	public function item(string $display) : void
	{
		$type = get_post_type();

		set_query_var('id', get_post_field('post_name', get_the_ID()));

		if ($display_type = $this->template("{$display}-item-{$type}")) {
			echo $display_type;
		} else {
			echo $this->template("{$display}-item");
		}
	}

	/**
	 * Setup and run the post query.
	 */
	public function query(array $attrs) : \WP_Query
	{
		$args = [
			'post_status' => 'publish',
			'ignore_sticky_posts' => ! rest_sanitize_boolean($attrs['sticky']),
			'orderby' => sanitize_text_field($attrs['orderBy']),
			'order' => sanitize_text_field($attrs['order']),
		];

		// Setup args for showing specific posts
		if ($attrs['specific']) {
			$args = array_merge($args, ['post_type' => 'any']);

			if ($attrs['include'] && $attrs['children']) {
				$args['posts_per_page'] = sanitize_text_field($attrs['number']);
				$args['post_parent__in'] = array_map('sanitize_text_field', (array) $attrs['include']);
			} else if ($attrs['include']) {
				$args['post__in'] = array_map('sanitize_text_field', (array) $attrs['include']);
			}
		} else {
			// Setup args for showing a feed of posts
			$args = array_merge($args, [
				'post_type' => array_map('sanitize_text_field', (array) $attrs['type']),
				'posts_per_page' => sanitize_text_field($attrs['number']),
				'offset' => (int) $attrs['offset']
			]);

			if ($attrs['taxonomy'] && $attrs['term']) {
				$args['tax_query'] = ['relation' => 'OR'];

				foreach ((array) $attrs['taxonomy'] as $taxonomy) {
					$terms = array_filter((array) $attrs['term'], function($term) use($taxonomy) {
						return explode('::', $term)[1] === $taxonomy;
					});

					if (! $terms) continue;

					$args['tax_query'][] = [
						'field' => 'id',
						'taxonomy' => sanitize_text_field($taxonomy),
						'terms' => array_map(fn($term) => sanitize_text_field(explode('::', $term)[0]), $terms)
					];
				}
			}

			if ($attrs['filter'] && $attrs['filterBy'] && $attrs['filterValue']) {
				[$key, $type] = explode('::', sanitize_text_field($attrs['filterBy']));
				$value = sanitize_text_field($attrs['filterValue']);

				$args['meta_query'] = [[
					'key' => $key,
					'value' => is_numeric($value) ? (int) $value : $value,
					'type' => is_numeric($value) ? 'NUMERIC' : 'CHAR',
					'compare' => $this->comparators[$attrs['filterType']]
				]];
			}
		}

		if ($attrs['orderMeta']) {
			[$key, $type] = explode('::', sanitize_text_field($attrs['orderMeta']));

			$args['meta_key'] = $key;
			$args['orderby'] = $type === 'int' ? 'meta_value_num' : 'meta_value';
		}

		return new \WP_Query(apply_filters('bloc/posts/query', $args));
	}

	/**
	 * Search all posts.
	 */
	public function search(\WP_REST_Request $request) : array
	{
		if (isset($request['include'])) {
			$posts = get_posts([
				'post_type' => 'any',
				'include' => array_map('absint', explode(',', $request['include'])),
			]);
		} else {
			$posts = get_posts([
				'post_type' => 'any',
				'posts_per_page' => 20,
				's' => sanitize_text_field($request['search'])
			]);
		}

		return array_map(fn($post) => [
			'value' => $post->ID,
			'label' => $post->post_title
		], $posts);
	}

	/**
	 * Get all taxonomies for an array post types.
	 */
	public function taxonomies(\WP_REST_Request $request) : array
	{
		$taxonomies = [];

		foreach	(explode(',', $request['type']) as $type) {
			if ($tax = get_object_taxonomies($type, 'objects')) {
				$taxonomies = array_merge(array_values($tax), $taxonomies);
			}
		}

		return array_unique(array_map(fn($taxonomy) => [
			'value' => $taxonomy->name,
			'label' => $taxonomy->label
		], $taxonomies), SORT_REGULAR);
	}

	/**
	 * Get all terms for an array taxonomies.
	 */
	public function terms(\WP_REST_Request $request) : array
	{
		$terms = [];

		foreach	(explode(',', $request['taxonomy']) as $taxonomy) {
			$tax_terms = get_terms(['taxonomy' => sanitize_text_field($taxonomy)]);

			if (! is_wp_error($tax_terms)) {
				$terms = array_merge($terms, $tax_terms);
			}
		}

		return array_map(fn($term) => [
			'value' => "{$term->term_id}::{$term->taxonomy}",
			'label' => $term->name
		], $terms);
	}

	/**
	 * Get all relevant custom fields, i.e. meta keys and types.
	 */
	public function fields(\WP_REST_Request $request) : array
	{
		$fields = [];
		$types = array_map('sanitize_text_field', explode(',', $request['type']));

		foreach ($types as $type) {
			$post = get_posts([ 'posts_per_page' => 1, 'post_type' => $type ]);

			if (! $post) continue;

			$keys = array_values(array_diff(get_post_custom_keys($post[0]->ID) ?: [],
				['_edit_lock', '_edit_last', '_thumbnail_id']
			));

			$fields = array_merge(array_map(function($field) use ($post) {
				$meta = get_post_meta($post[0]->ID, $field, true);
				$type = $meta && is_numeric($meta) ? 'int' : 'string';

				return [
					'value' => "{$field}::{$type}",
					'label' => ucfirst(trim(str_replace('_', ' ', $field)))
				];
			}, $keys), $fields);
		}

		return $fields;
	}

	/**
	 * Locate and load a template.
	 */
	public function template(string $file) : string
	{
		$in_theme = get_template_directory() . "/bloc/posts/{$file}.php";
		$in_plugin = BLOC_BLOCKS_DIR . "posts/templates/{$file}.php";

		ob_start();

		if (file_exists($in_theme)) {
			load_template($in_theme, false);
		} else if (file_exists($in_plugin)) {
			load_template($in_plugin, false);
		}

		return ob_get_clean();
	}
}
