<?php // Template Version: 0.1.0 ?>
<article class="bloc-posts-<?= $attributes['display']; ?>-item bloc-posts-<?= $attributes['display']; ?>-<?= get_post_type(); ?> swiper-slide">
	<h3><?php the_title(); ?></h4>
	<?php the_excerpt(); ?>
	<?php the_post_thumbnail(); ?>
</article>
