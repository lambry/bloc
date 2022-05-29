<?php // Template Version: 0.1.0 ?>
<?php if ($query->have_posts()) : ?>
	<section id="<?= $attributes['anchor']; ?>" class="bloc-posts bloc-posts-<?= $attributes['display']; ?> bloc-posts-columns-sm-<?= $attributes['columnsSmall']; ?> bloc-posts-columns-md-<?= $attributes['columnsMedium']; ?> bloc-posts-columns-lg-<?= $attributes['columnsLarge']; ?> <?= !$attributes['gapless'] ? 'bloc-posts-gap' : '' ; ?> <?= $attributes['className']; ?>">
		<?php while ($query->have_posts()) : $query->the_post(); ?>
			<?php do_action('bloc/posts/item', 'grid'); ?>
		<?php endwhile; ?>
	</section>
<?php else : ?>
	<?= apply_filters('bloc/posts/empty', __('No results found', 'bloc'), $attributes['display']); ?>
<?php endif;
