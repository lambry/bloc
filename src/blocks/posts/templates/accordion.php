<?php if ($query->have_posts()) : ?>
	<section id="<?= $attributes['anchor']; ?>" class="bloc-posts bloc-posts-<?= $attributes['display']; ?> bloc-posts-columns-sm-<?= $attributes['columnsSmall']; ?> bloc-posts-columns-md-<?= $attributes['columnsMedium']; ?> bloc-posts-columns-lg-<?= $attributes['columnsLarge']; ?> <?= $attributes['className']; ?>" data-open-first="<?= $attributes['openFirst']; ?>" data-open-individually="<?= $attributes['openIndividually']; ?>">
		<?php while ($query->have_posts()) : $query->the_post(); ?>
			<?php do_action('bloc/posts/item', 'accordion'); ?>
		<?php endwhile; ?>
	</section>
<?php else : ?>
	<?= apply_filters('bloc/posts/empty', __('No results found', 'bloc-posts'), $attributes['display']); ?>
<?php endif;
