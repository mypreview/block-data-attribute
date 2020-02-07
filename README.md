# Block Data Attribute

## Installation

* Download the plugin from it's GitHub Repository Release window.
* Log into your WordPress website and navigate to **Plugins** » **Add New**.
* Click **Upload Plugin** and **Choose File**, then select the plugin’s `.zip` file. Click **Install Now**.
* Click **Activate** to start using your plugin right away.

## Requirements

* PHP version 7.2 or greater.
* MySQL version 5.6 or greater OR MariaDB version 10.0 or greater.
* WordPress version 5.2 or greater.

## Description

This plugin designed with extensibility in mind for data that should be associated with a particular block type but need not have any defined meaning. `data-*` attributes will allow you to store extra information on different Gutenberg blocks, without other hacks such as non-standard attributes, appending properties on DOM, or modifying a block as HTML which will throw a block validation error when opening the post edit page once again.