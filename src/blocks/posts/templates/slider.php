<?php if ($query->have_posts()) : ?>
	<section id="<?= $attributes['anchor']; ?>" class="bloc-posts bloc-posts-<?= $attributes['display']; ?> <?= $attributes['className']; ?>" data-columns-sm="<?= $attributes['columnsSmall']; ?>" data-columns-md="<?= $attributes['columnsMedium']; ?>" data-columns-lg="<?= $attributes['columnsLarge']; ?>" data-auto-play="<?= $attributes['autoPlay']; ?>" data-loop-slides="<?= $attributes['loopSlides']; ?>" data-fade-slides="<?= $attributes['fadeSlides']; ?>">
		<div class="swiper">
			<div class="swiper-wrapper">
				<?php while ($query->have_posts()) : $query->the_post(); ?>
					<?php do_action('bloc/posts/item', 'slider'); ?>
				<?php endwhile; ?>
			</div>
		</div>

		<?php if ($attributes['pagination']) : ?>
			<div class="bloc-posts-<?= $attributes['display']; ?>-pagination swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal">
				<span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
				<span class="swiper-pagination-bullet"></span>
			</div>
		<?php endif; ?>

		<?php if ($attributes['navigation']) : ?>
			<button type="button" class="bloc-posts-<?= $attributes['display']; ?>-button-prev swiper-button-prev"></button>
			<button type="button" class="bloc-posts-<?= $attributes['display']; ?>-button-next swiper-button-next"></button>
		<?php endif; ?>
	</section>
<?php else : ?>
	<?= apply_filters('bloc/posts/empty', __('No results found', 'bloc-posts'), $attributes['display']); ?>
<?php endif;
