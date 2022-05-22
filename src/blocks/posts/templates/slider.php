<?php // Template Version: 0.1.0 ?>
<?php if ($query->have_posts()) : ?>
	<section id="<?= $attributes['anchor']; ?>" class="bloc-posts bloc-posts-<?= $attributes['display']; ?> <?= $attributes['className']; ?>" data-columns-sm="<?= $attributes['columnsSmall']; ?>" data-columns-md="<?= $attributes['columnsMedium']; ?>" data-columns-lg="<?= $attributes['columnsLarge']; ?>" data-auto-play="<?= $attributes['autoPlay']; ?>" data-loop-slides="<?= $attributes['loopSlides']; ?>" data-fade-slides="<?= $attributes['fadeSlides']; ?>" data-gapless="<?= $attributes['gapless']; ?>">
		<div class="swiper">
			<div class="swiper-wrapper">
				<?php while ($query->have_posts()) : $query->the_post(); ?>
					<?php do_action('bloc/posts/item', 'slider'); ?>
				<?php endwhile; ?>
			</div>
		</div>

		<?php if ($attributes['pagination']) : ?>
			<div class="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal">
				<span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
				<span class="swiper-pagination-bullet"></span>
			</div>
		<?php endif; ?>

		<?php if ($attributes['navigation']) : ?>
			<button type="button" class="swiper-navigation swiper-button-prev"></button>
			<button type="button" class="swiper-navigation swiper-button-next"></button>
		<?php endif; ?>
	</section>
<?php else : ?>
	<?= apply_filters('bloc/posts/empty', __('No results found', 'bloc-posts'), $attributes['display']); ?>
<?php endif;
