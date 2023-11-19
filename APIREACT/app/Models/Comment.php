<?php 

namespace App\Models;

class Comment
{
	
	private static $blog_posts = 
	[
		[
			"judul" => "figojulioez@gmail.com",
			"slug" => "judul-tulisan-pertama",
			"body" => "Halooo ini adalah teks artikel tulisan pertama. LoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		],[
			"judul" => "figojulioez",
			"slug" => "judul-tulisan-kedua",
			"body" => "Halooo ini adalah teks artikel tulisan kedua. LoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		]
	];

	public static function all() {
		return collect(self::$blog_posts);
	}

	public static function find ($slug) {
		$post = static::all();

		return $post->firstWhere('slug', $slug);
	}
}