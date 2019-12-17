<?php
	get_header();
	the_post();
	
	$class = ( is_active_sidebar( 'primary' ) ) ? 'col2-3' : 'col3-3';
?>

<div class="container">
    
    
	
	<?php get_template_part( 'inc/content', 'thumbnail' ); ?>
	
	<article id="post-<?php the_ID(); ?>" <?php post_class( $class . ' hentry article-single' ); ?>>
	
		<p class="tiny above-h2">
			<?php esc_html_e( 'Published', 'huntington' ); ?> 
			<span class="divider"></span>
			<?php the_time( get_option( 'date_format' ) ); ?>
		</p>
		
		<?php
			the_title( '<h2><strong>', '</strong></h2>' );
			the_content();
			wp_link_pages();
			the_tags( '<p>', ', ', '</p>' );
		?>
		
	</article>
	
	<?php get_sidebar(); ?>
	
	<div class="clear"></div>
	
	<article class="col3-3 hentry article-single">
        <a href="vin.html">image1</a>
		<?php
			get_template_part( 'inc/content', 'author' );
			
			if( !post_password_required() ){
				if( comments_open() || get_comments_number() ){
					comments_template();
				}
			}
		?>
	</article>
	
	<div class="clear"></div>
	    
	<?php get_template_part( 'inc/content', 'post-nav' ); ?>

</div>

<?php get_footer();