---
title: Apache - adding a new site in under 2 minutes.
layout: post
shortpost: true
Published: 2016-03-16
tags:
  - apache
  - linux
---
There's a [great guide on Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-configure-the-apache-web-server-on-an-ubuntu-or-debian-vps) for setting up new sites in Apache on Linux. Once you've done it a few times though it can be shortened to a few bullet points:

- `md /var/www/example.com`
- `md /var/www/example.com/public_html`
- `nano /var/www/example.com/public_html/index.html`

**copy/create a conf in /etc/apache2/sites-available, e.g. example.com.conf:**


    <VirtualHost *:80>
            # The ServerName directive sets the request scheme, hostname and port that
            # the server uses to identify itself. This is used when creating
            # redirection URLs. In the context of virtual hosts, the ServerName
            # specifies what hostname must appear in the request's Host: header to
            # match this virtual host. For the default virtual host (this file) this
            # value is not decisive as it is used as a last resort host regardless.
            # However, you must set it for any further virtual host explicitly.
            ServerName www.example.com

            ServerAdmin webmaster@localhost
            DocumentRoot /var/www/example.com/public_html

            # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
            # error, crit, alert, emerg.
            # It is also possible to configure the loglevel for particular
            # modules, e.g.
            #LogLevel info ssl:warn

            ErrorLog ${APACHE_LOG_DIR}/error.log
            CustomLog ${APACHE_LOG_DIR}/access.log combined

            # For most configuration files from conf-available/, which are
            # enabled or disabled at a global level, it is possible to
            # include a line for only one particular virtual host. For example the
            # following line enables the CGI configuration for this host only
            # after it has been globally disabled with "a2disconf".
            #Include conf-available/serve-cgi-bin.conf
    </VirtualHost>


- `sudo a2ensite example.com.conf`
- `service apache2 restart`
