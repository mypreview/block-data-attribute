=== Block Data Attribute ===
Contributors: mahdiyazdani, mypreview, gookaani
Tags: blocks, gutenberg, gutenberg blocks, block-editor, attribute, data
Donate link: https://www.buymeacoffee.com/mahdiyazdani
Requires at least: 5.5
Tested up to: 6.1
Requires PHP: 7.4
Stable tag: 2.0.2
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

This plugin designed with extensibility in mind for data that should be associated with a particular block type but need not have any defined meaning.

== Description ==
This plugin designed with extensibility in mind for data that should be associated with a particular block type but need not have any defined meaning. `data-*` attributes will allow you to store extra information on different Gutenberg blocks, without other hacks such as non-standard attributes, appending properties on DOM, or modifying a block as HTML which will throw a block validation error when opening the post edit page once again.

== Installation ==
= Minimum Requirements =

* PHP version 7.4 or greater.
* MySQL version 5.6 or greater or MariaDB version 10.0 or greater.
* WordPress version 5.5 or greater.

= Automatic installation =

Automatic installation is the easiest option — WordPress will handle the file transfer, and you won’t need to leave your web browser. To do an automatic install of the plugin, log in to your WordPress dashboard, navigate to the Plugins menu, and click “Add New.”

In the search field type “Block Data Attribute”, then click “Search Plugins.” Once you’ve found the plugin, you can view details about it such as the point release, rating, and description. Click “Install Now,” and WordPress will take it from there.

= Manual installation =

The manual installation method requires downloading the plugin and uploading it to your webserver via your favorite FTP application. The WordPress codex contains [instructions on how to do this here](https://wordpress.org/support/article/managing-plugins/#manual-plugin-installation "Manual plugin installation").

= Updating =
Automatic updates should work smoothly, but we still recommend you back up your site.

== Frequently Asked Questions ==
= How do I create a custom data attribute? =
1. Log into your WordPress website and navigate to Dashboard.
2. Create a new page, by visiting “Pages” » “Add New”.
3. Click on the “Add Block” button and select the “Button” block. Alternatively, you can start typing `/button` in a new paragraph block, then press enter.
4. Once you’ve inserted the block, you can use the block settings sidebar to add your custom data attribute.
5. Clicking on the `⚙` cog icon next to the publish button will toggle the visibility of this sidebar.
6. In the block sidebar, you can expand the `Block Data Attribute` section to add custom attributes as needed.
7. Publish the page.

= Which blocks are allowed to accept custom data attributes? =
Currently, custom data attributes can be saved within the following blocks:

* `core/button`
* `core/column`
* `core/columns`
* `core/heading`
* `core/group`
* `core/paragraph`

Generally, this would be possible due to a JavaScript hooks system with WordPress that includes block filters and several other types of filters available via JavaScript.

You can extend the predefined list of block names by hooking into the `mypreview.blockDataAttributeAllowedBlocks` filter provided by the plugin.

= How do I get help with the plugin? =
The easiest way to receive support is to “Create a new topic” by visiting Community Forums page [here](https://wordpress.org/support/plugin/block-data-attribute "Block Data Attribute Support Forum").

Make sure to check the “Notify me of follow-up replies via email” checkbox to receive notifications, as soon as a reply posted to your question or inquiry.

*Please note that this is an opensource 100% volunteer project, and it’s not unusual to get reply days or even weeks later.*

= Can I help in translating this plugin into a new language? =
The plugin is fully translation-ready and localized using the GNU framework, and translators are welcome to contribute to the plugin.

Here’s the the [WordPress translation website &#8594;](https://translate.wordpress.org/projects/wp-plugins/block-data-attribute "WordPress translation website")

= How do I contribute to this plugin? =
We welcome contributions in any form, and you can help reporting, testing, and detailing bugs.

Here’s the [GitHub development repository &#8594;](https://github.com/mypreview/block-data-attribute "GitHub development repository")

= Did you like the idea behind this plugin? =
If you or your company use any of my projects or like what I’m doing, please consider [making a donation](https://www.buymeacoffee.com/mahdiyazdani) so I can continue maintaining and evolving all my projects and new ones. I’m in this for the long run.

--AND/OR--

Please share your experience by leaving this plugin [5 shining stars](https://wordpress.org/support/plugin/block-data-attribute/reviews/ "Rate Block Data Attribute 5 stars") if you like it, thanks!

== Screenshots ==
1. Plugin Settings

== Changelog ==
= 2.0.2 =
* Compatibility with WordPress 6.1

= 2.0.1 =
* Added missing `data` keyword from the attribute name.

= 2.0.0 =
* Define unlimited number of attributes.
* Compatibility with WordPress 6.0
* Updated node modules.

= 1.0.5 =
* Fixed incorrect escaping in data `value` attribute pair.

= 1.0.4 =
* Updated node modules.
* Compatibility with WordPress 5.5

= 1.0.3 =
* Multiple code standards improvements.
* Compatibility with WordPress 5.4.1

= 1.0.2 =
* Multiple code standards improvements.
* Compatibility with WordPress 5.4.0

= 1.0.1 =
* Fixed Github repo web-address.
* Updated plugin banner image.

= 1.0.0 =
* Initial release.

== Upgrade Notice ==
= 2.0.0 =
* Due to necessary and unavoidable underlying code refactoring, upgrading to this version from previous releases would require manual data migration.
