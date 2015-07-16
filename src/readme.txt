=== Theme Name ===
Contributors: Ocular Logic Starter Template
Donate link: http://example.com/
Tags: comments, spam
Requires at least: 3.0.1
Tested up to: 3.4
Stable tag: 4.3
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Very basic starter theme source with custom post type, custom taxonomy, custom post meta and starting functions added. 

== List of things needed to change for each theme ==

What you have to change:

* functions-config.php (This is where the custom post type, custom meta and custom taxonomy is located)
	-Change slug to custom post type name
	-Change taxonomy to match post type and name it
	-Remove any uneeded meta boxes
* taxonomy.php (This handles the custom taxonomy page i.e. lists posts for custom taxonomy)
	-Change to custom post name slug
	-Change to custom taxonomy slug
* archive-post_type_slug.php
	-Change this files name to match custom post type name from functions-config.php
* single-post_type_slug.php
	-Change this files name to match custom post type name from functions-config.php

