<?php // Template Version: 0.1.0 ?>
<article class="bloc-posts-accordion-item bloc-posts-accordion-<?= get_post_type(); ?>">
	<h3 class="bloc-posts-accordion-title">
		<button type="button" id="<?= "{$id}-label"; ?>" class="bloc-posts-accordion-toggle" aria-controls="<?= $id; ?>" aria-expanded="false">
			<?php the_title(); ?>
		</button>
	</h3>
	<div id="<?= $id; ?>" class="bloc-posts-accordion-content" aria-labelledby="<?= "{$id}-label"; ?>" role="region">
		<?php the_excerpt(); ?>
	</div>
</article>
