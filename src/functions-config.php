<?php // ==== CONFIGURATION (CUSTOM) ==== //

// Specify custom configuration values in this file; these will override values in `functions-config-defaults.php`
// The general idea here is to allow for themes to be customized for specific installations



// ==== CUSTOM POST SETUP (change name and names of page files to match) ==== //
	function custom_post_type() {

		$labels = array(
			'name'                => _x( 'Post Types', 'Post Type General Name', 'text_domain' ),
			'singular_name'       => _x( 'Post Type Name', 'Post Type Singular Name', 'text_domain' ),
			'menu_name'           => __( 'Post Type', 'text_domain' ),
			'name_admin_bar'      => __( 'Post Type', 'text_domain' ),
			'parent_item_colon'   => __( 'Parent Item:', 'text_domain' ),
			'all_items'           => __( 'All Items', 'text_domain' ),
			'add_new_item'        => __( 'Add New Item', 'text_domain' ),
			'add_new'             => __( 'Add New', 'text_domain' ),
			'new_item'            => __( 'New Item', 'text_domain' ),
			'edit_item'           => __( 'Edit Item', 'text_domain' ),
			'update_item'         => __( 'Update Item', 'text_domain' ),
			'view_item'           => __( 'View Item', 'text_domain' ),
			'search_items'        => __( 'Search Item', 'text_domain' ),
			'not_found'           => __( 'Not found', 'text_domain' ),
			'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
		);

		$args = array(
			'label'               => __( 'post_type_slug', 'text_domain' ), //-------> the slug
			'description'         => __( 'Post Type Description', 'text_domain' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail'),
			'taxonomies'          => array(),
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'menu_icon'           => 'dashicons-admin-page',
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => true,		
			'exclude_from_search' => false,
			'publicly_queryable'  => true,
			'capability_type'     => 'page',
		);
		register_post_type( 'post_type_slug', $args ); //-------> change to the slug

	}

	// Hook into the 'init' action
	add_action( 'init', 'custom_post_type', 0 );




// ==== CUSTOM TAXONOMY SETUP (change name and names of page files to match) ==== //
	function my_taxonomies_custom() {
	  $labels = array(
	    'name'              => _x( 'Post Categories', 'taxonomy general name' ),
	    'singular_name'     => _x( 'Post Category', 'taxonomy singular name' ),
	    'search_items'      => __( 'Search Post Categories' ),
	    'all_items'         => __( 'All Post Categories' ),
	    'parent_item'       => __( 'Parent Post Category' ),
	    'parent_item_colon' => __( 'Parent Post Category:' ),
	    'edit_item'         => __( 'Edit Post Category' ), 
	    'update_item'       => __( 'Update Post Category' ),
	    'add_new_item'      => __( 'Add New Post Category' ),
	    'new_item_name'     => __( 'New Post Category' ),
	    'menu_name'         => __( 'Post Categories' ),
	  );
	  $args = array(
	    'labels' 			=> $labels,
	    'hierarchical' 		=> true,
	    'show_ui'           => true,
    	'show_admin_column' => true,
	    'rewrite' 			=> array(
		 	'slug'				=> 'custom_category',//-------> create slug
		  	'with_front' 		=> true,
		  	'hierarchical'		=> true ,
		),
	  );
	  register_taxonomy( 'custom_category', 'post_type_slug', $args );  //-------> change to the slug
	}
	add_action( 'init', 'my_taxonomies_custom', 0 );




// ==== CUSTOM META FOR THE POST (change name to match custom post type name) ==== //

	/********************
	Add the acutal boxes
	********************/

	//add custom meta box to bottom of post
	function custom_meta() {
	    add_meta_box(
	     'prfx_meta', 
	     __( 'Meta Box Title', 'prfx-textdomain' ), 
	     'prfx_meta_callback', 
	     'post_type_slug' ////////////////////////////// change to the slug

	 	);
	}
	add_action( 'add_meta_boxes', 'custom_meta' );

	function add_custom_meta_boxes() {
 
    // Define the custom attachment for posts
    add_meta_box(
        'wp_custom_attachment',
        'PDF Upload',
        'wp_custom_attachment',
        'post_type_slug', ///////////////////////////////// change to the slug
        'side'
    	);
 
	} // end add_custom_meta_boxes
	add_action('add_meta_boxes', 'add_custom_meta_boxes');


	/********************
	Meta box Functions
	********************/

	//Function to display meta box content  -  Customize this are for meta box needs 
	function prfx_meta_callback( $post ) {
	    wp_nonce_field( basename( __FILE__ ), 'prfx_nonce' );
	    $prfx_stored_meta = get_post_meta( $post->ID );
	    ?>
	 
	 	<!-- Here is a text box -->
	    <p>
	        <label for="meta-text" class="prfx-row-title"><?php _e( 'Example Text Input', 'prfx-textdomain' )?></label>
	        <input type="text" name="meta-text" id="meta-text" value="<?php if ( isset ( $prfx_stored_meta['meta-text'] ) ) echo $prfx_stored_meta['meta-text'][0]; ?>" />
	    </p>

		<!-- Here is some check boxs-->
	    <p>
		    <span class="prfx-row-title"><?php _e( 'Example Checkbox Input', 'prfx-textdomain' )?></span>
		    <div class="prfx-row-content">
		        <label for="meta-checkbox">
		            <input type="checkbox" name="meta-checkbox" id="meta-checkbox" value="yes" <?php if ( isset ( $prfx_stored_meta['meta-checkbox'] ) ) checked( $prfx_stored_meta['meta-checkbox'][0], 'yes' ); ?> />
		            <?php _e( 'Checkbox label', 'prfx-textdomain' )?>
		        </label>
		        <label for="meta-checkbox-two">
		            <input type="checkbox" name="meta-checkbox-two" id="meta-checkbox-two" value="yes" <?php if ( isset ( $prfx_stored_meta['meta-checkbox-two'] ) ) checked( $prfx_stored_meta['meta-checkbox-two'][0], 'yes' ); ?> />
		            <?php _e( 'Another checkbox', 'prfx-textdomain' )?>
		        </label>
		    </div>
		</p>

		<!-- Here is some radio buttons-->
		<p>
		    <span class="prfx-row-title"><?php _e( 'Example Radio Buttons', 'prfx-textdomain' )?></span>
		    <div class="prfx-row-content">
		        <label for="meta-radio-one">
		            <input type="radio" name="meta-radio" id="meta-radio-one" value="radio-one" <?php if ( isset ( $prfx_stored_meta['meta-radio'] ) ) checked( $prfx_stored_meta['meta-radio'][0], 'radio-one' ); ?>>
		            <?php _e( 'Radio Option #1', 'prfx-textdomain' )?>
		        </label>
		        <label for="meta-radio-two">
		            <input type="radio" name="meta-radio" id="meta-radio-two" value="radio-two" <?php if ( isset ( $prfx_stored_meta['meta-radio'] ) ) checked( $prfx_stored_meta['meta-radio'][0], 'radio-two' ); ?>>
		            <?php _e( 'Radio Option #2', 'prfx-textdomain' )?>
		        </label>
		    </div>
		</p>

		<!-- Here is a select list-->
		<p>
		    <label for="meta-select" class="prfx-row-title"><?php _e( 'Example Select Input', 'prfx-textdomain' )?></label>
		    <select name="meta-select" id="meta-select">
		        <option value="select-one" <?php if ( isset ( $prfx_stored_meta['meta-select'] ) ) selected( $prfx_stored_meta['meta-select'][0], 'select-one' ); ?>><?php _e( 'One', 'prfx-textdomain' )?></option>';
		        <option value="select-two" <?php if ( isset ( $prfx_stored_meta['meta-select'] ) ) selected( $prfx_stored_meta['meta-select'][0], 'select-two' ); ?>><?php _e( 'Two', 'prfx-textdomain' )?></option>';
		    </select>
		</p>
	
		<!-- Here is a text area-->
		<p>
		    <label for="meta-textarea" class="prfx-row-title"><?php _e( 'Example Textarea Input', 'prfx-textdomain' )?></label>
		    <textarea name="meta-textarea" id="meta-textarea"><?php if ( isset ( $prfx_stored_meta['meta-textarea'] ) ) echo $prfx_stored_meta['meta-textarea'][0]; ?></textarea>
		</p>

		<!-- Here is a file upload -->
		<p>
		    <label for="meta-file" class="prfx-row-title"><?php _e( 'Example File Upload', 'prfx-textdomain' )?></label>
		    <input type="text" name="meta-file" id="meta-file" value="<?php if ( isset ( $prfx_stored_meta['meta-file'] ) ) echo $prfx_stored_meta['meta-file'][0]; ?>" />
		    <input type="button" id="meta-file-button" class="button" value="<?php _e( 'Choose or Upload an Image', 'prfx-textdomain' )?>" />
		</p>
	 
	    <?php
	}


	//Here is a file upload, probably wont ever need to change anything here 
	function wp_custom_attachment() {
 
	    wp_nonce_field(plugin_basename(__FILE__), 'wp_custom_attachment_nonce');
	     
	    $html = '<p class="description">';
	        $html .= 'Upload your PDF here.';
	    $html .= '</p>';
	    $html .= '<input type="file" id="wp_custom_attachment" name="wp_custom_attachment" value="" size="25" />';
	     
	    echo $html;
	 
	}


	/********************************
	Save all the data we just inputed 
	********************************/

	//Function to save the data
	function prfx_meta_save( $post_id ) {
 
	    // Checks save status
	    $is_autosave = wp_is_post_autosave( $post_id );
	    $is_revision = wp_is_post_revision( $post_id );
	    $is_valid_nonce = ( isset( $_POST[ 'prfx_nonce' ] ) && wp_verify_nonce( $_POST[ 'prfx_nonce' ], basename( __FILE__ ) ) ) ? 'true' : 'false';
	 
	    // Exits script depending on save status
	    if ( $is_autosave || $is_revision || !$is_valid_nonce ) {
	        return;
	    }
	 
	 	//Text Box Save
		    // Checks for input and sanitizes/saves if needed
		    if( isset( $_POST[ 'meta-text' ] ) ) {
		        update_post_meta( $post_id, 'meta-text', sanitize_text_field( $_POST[ 'meta-text' ] ) );
		    }

	    //Check Box Save
		    // Checks for input and saves
			if( isset( $_POST[ 'meta-checkbox' ] ) ) {
			    update_post_meta( $post_id, 'meta-checkbox', 'yes' );
			} else {
			    update_post_meta( $post_id, 'meta-checkbox', '' );
			}
			 
			// Checks for input and saves
			if( isset( $_POST[ 'meta-checkbox-two' ] ) ) {
			    update_post_meta( $post_id, 'meta-checkbox-two', 'yes' );
			} else {
			    update_post_meta( $post_id, 'meta-checkbox-two', '' );
			}

		//Radio Button Save
			// Checks for input and saves if needed
			if( isset( $_POST[ 'meta-radio' ] ) ) {
			    update_post_meta( $post_id, 'meta-radio', $_POST[ 'meta-radio' ] );
			}

		//Select List Save
			// Checks for input and saves if needed
			if( isset( $_POST[ 'meta-select' ] ) ) {
			    update_post_meta( $post_id, 'meta-select', $_POST[ 'meta-select' ] );
			}
	 
	 	//Text Area Save
		 	// Checks for input and saves if needed
			if( isset( $_POST[ 'meta-textarea' ] ) ) {
			    update_post_meta( $post_id, 'meta-textarea', $_POST[ 'meta-textarea' ] );
			}

		

	}
	add_action( 'save_post', 'prfx_meta_save' );


	/********************************
	Save the PDF we just uploaded 
	********************************/
	function save_custom_meta_data($id) {
		/* --- security verification --- */
		if(!wp_verify_nonce($_POST['wp_custom_attachment_nonce'], plugin_basename(__FILE__))) {
		  return $id;
		} // end if
		if(defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
		  return $id;
		} // end if
		if('page' == $_POST['post_type']) {
		  if(!current_user_can('edit_page', $id)) {
		    return $id;
		  } // end if
		} else {
	   		if(!current_user_can('edit_page', $id)) {
		    	return $id;
		   	} // end if
		} // end if
		/* - end security verification - */
		// Make sure the file array isn't empty
		if(!empty($_FILES['wp_custom_attachment']['name'])) {
			// Setup the array of supported file types. In this case, it's just PDF.
			$supported_types = array('application/pdf');
			// Get the file type of the upload
			$arr_file_type = wp_check_filetype(basename($_FILES['wp_custom_attachment']['name']));
			$uploaded_type = $arr_file_type['type'];
			// Check if the type is supported. If not, throw an error.
			if(in_array($uploaded_type, $supported_types)) {
				// Use the WordPress API to upload the file
				$upload = wp_upload_bits($_FILES['wp_custom_attachment']['name'], null, file_get_contents($_FILES['wp_custom_attachment']['tmp_name']));
				if(isset($upload['error']) && $upload['error'] != 0) {
					wp_die('There was an error uploading your file. The error is: ' . $upload['error']);
				} else {
					add_post_meta($id, 'wp_custom_attachment', $upload);
					update_post_meta($id, 'wp_custom_attachment', $upload);
				} // end if/else
			} else {
				wp_die("The file type that you've uploaded is not a PDF.");
			} // end if/else
		} // end if
	} // end save_custom_meta_data

	add_action('save_post', 'save_custom_meta_data');


	/********************************s
	  Allow for PDF Security Uploads
	********************************/
	function update_edit_form() {
	    echo ' enctype="multipart/form-data"';
	} // end update_edit_form
	add_action('post_edit_form_tag', 'update_edit_form');
