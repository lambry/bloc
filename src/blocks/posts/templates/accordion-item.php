<?php // Template Version: 0.1.0 ?>
<article class="bloc-posts-accordion-item bloc-posts-accordion-<?= get_post_type(); ?>">
	<h3 class="bloc-posts-accordion-title">
		<button type="button" class="bloc-posts-accordion-toggle" aria-controls="<?= "bloc-posts-accordion-{$id}"; ?>" aria-expanded="false">
			<?php the_title(); ?>
		</button>
	</h3>
	<div id="<?= "bloc-posts-accordion-{$id}"; ?>" class="bloc-posts-accordion-content" role="region">
		<?php the_excerpt(); ?>
	</div>
</article>
