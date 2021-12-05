<article class="bloc-posts-grid-item bloc-posts-grid-<?= get_post_type(); ?>">
	<?php the_post_thumbnail(); ?>
	<h3><?php the_title(); ?></h3>
	<?php the_excerpt(); ?>
</article>
