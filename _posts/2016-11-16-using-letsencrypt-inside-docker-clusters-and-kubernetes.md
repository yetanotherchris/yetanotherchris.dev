---
Published: 2016-11-16
title: Using letsencrypt and certbot inside a Docker cluster
author: Chris S
excerpt: "Letsencrypt.org is a free SSL certificate service. This post explains creating and renewing using its certbot for Docker containers."
layout: post
tags:
  - letsencrypt
  - docker
  - kubernetes
---

*Warning: long boring how-to blog post*...

[Letsencrypt.org](Letsencrypt.org) is a free SSL certificate service. As a certificate authority, it is at the time of writing trusted by Chrome (desktop), IE10 and shortly Firefox. Currently it uses another provider for its authority chain, and the biggest restrictions are the SSL certificates are for public domains only and your certificates only last 3 months.

It's fairly easy to setup, you use a tool called cert-bot. This handles creating the private and public key for you, however it assumes you have your website running on is a single VM/server with a known IP address.

This caused problems for me when running a site in a Docker container on Kubernetes, on Google Cloud, as it's behind a load balancer. There's no way to get into the load balancer and run the request from there, so the solution is to `docker exe -it {id} bash` into the container and create a domain-proof file on the site.

The cert is for a .NET core site running inside Docker on Kubernetes, with its build pipeline in Gitlab. I'm hoping to write up all my experience with Kubernetes in a blog post series soon, so it doesn't get lost in text files.

Large parts of this post are thanks to [this blog post](https://realguess.net/2016/09/26/installing-let-s-encrypt-ssl-certificate-on-google-app-engine-using-certbot/).

### Step 1. Nginx (assuming you're using NGinx)

To verify your site (on renewal, possibly on creation too), you need a Google/Bing-style site-ownership file on your server. You will need to update your NGinx configuration to add a location for this, below is an example configuration. As this is a .NET core site, my NGinx site is actually a reverse proxy, but I've cut that out from the config below.

	server {
	  listen 80;
	  listen 443 ssl;
	  server_name www.example.com example.com example.local;
	  resolver 8.8.8.8;

	  root /usr/share/nginx/html/example.com;

	ssl on;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	ssl_prefer_server_ciphers on;
	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-RC4-SHA:ECDHE-RSA-AES128-SHA:AES128-SHA:RC4-SHA;
	ssl_session_cache shared:SSL:10m;

	  ssl_certificate /usr/share/nginx/keys/example.com/cert.pem;
	ssl_certificate_key /usr/share/nginx/keys/example.com/privatekey.pem;

	  # Lets encrypt renew domain verification files
	  location ^~ /.well-known/acme-challenge {
	  allow all;
	  default_type "text/plain";
	  }

	}

### Step 2. Download certbot
You'll need to follow the advanced instructions for installing certbot. This is bash for windows:

	sudo -i
	cd ~
	wget https://dl.eff.org/certbot-auto
	chmod a+x certbot-auto

### Step 3. The "fun" starts - run certbot.

The certbot command and arguments you'll need to run:

	./certbot-auto certonly --manual --manual-public-ip-logging-ok -d example.com -d www.example.com

Follow the onscreen instructions, it'll give you a python script with an ID piping to another ID file for each domain. **DON'T PRESS RETURN YET**.

> e.g. {FIRST-ID} > .well-known/acme-challenge/{SECOND-ID}

### Step 4. In a new terminal, SSH into your Docker host
You can do this through the browser SSH client with Google Cloud.

### Step 5. Find your NGinx Docker container and go inside it.

Once again this assumes you're using NGinx.

	docker ps -a
	docker exec -it {id} bash
	cd /usr/share/nginx/html/example.com/.well-known/acme-challenge

For every ID you were given by certbot before, echo out the id to a file:

	echo FIRST_VERYLONG_ID > ANOTHER_VERY_LONG_ID

### Step 6. Hit enter on the Certbot

It'll try a HTTP request for http://www.example.com/.well-known/acme-challenge/{ANOTHER_VERY_LONG_ID} and expect "{FIRST_VERYLONG_ID}" back. If all goes well, it will generate the certs for you.

### Step 7. (Bash for Windows only). Copy the PEM files onto the C:\ drive

The PEM files are created in `/etc/letsencrypt/live/example.com`. You need the private and public key.

On bash for windows it's easier to just copy these to C: than finding /etc/ on the Windows file system.

	cd /etc/letsencrypt/live/example.com
	more cert.pem > /mnt/c/cert.pem
	more privkey.pem > /mnt/c/privkey.pem

### Step 8. Update the PEM files inside your NGinx Docker image

You'll need both the private key and the cert (Letsencrypt generates a new private key for you each time).

### Step 9. Docker build and launch a new Docker container.

In the pipeline I've created, this is as simple as pushing to Gitlab, and then updating the Docker image id using `kubectl edit deployments/nginx`. #smug-developer :D.
