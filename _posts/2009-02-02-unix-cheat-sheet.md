---
Published: 2009-02-02
title: "Unix Cheat Sheet"
author: Chris S
excerpt: "This post is a command reference card for some regularly used unix commands, tested on linux (Redhat 6, a while ago) but should hopefully work on most unix command shells."
layout: post
permalink: /tools/unix-cheat-sheet/
dsq_thread_id:
  - 1074123375
tags:
  - tools
---
This post is a command reference card for some regularly used unix commands, tested on linux (Rdhat 6, a while ago) but should hopefully work on most unix command shells. Any additional (non-obscure) commands you think should be added,or corrections please email me.

## General help

[command] -help - gives syntax for using that command

<!--more-->

  * man [command] - brings up the manual page for the command, if it exists
  * man [command] > file.txt - dumps the manual page(s) for the command into &#8216;file.txt'
  * whatis [command] - gives a short description of the command.
  * help - gives a list of commands (GNU Bash).
  * help [command] - gives extra information on the commands listed above.

### Viewing/editing/creating a text file

vi [filename] - opens VI text editor, if the file doesn't exist, it'll be created on saving. 

When inside vi:

  * using &#8216;i' inserts
  * pressing &#8216;escape' and then &#8216;:' goes back to command mode.
  * &#8216;/searchstring' searchs for &#8216;searchstring' using regular expressions.
  * &#8216;:' followed by &#8216;w' writes
  * &#8216;:' followed by &#8216;qw' writes then quits
  * &#8216;:' followed by &#8216;q' quits.
  * &#8216;:' followed by &#8216;q!' quits regardless of whether changes are made.
  * &#8216;:' followed by &#8216;z' undos. 

Some common other text editing commands:

  * pico [filename] - launches the PICO editor for the filename.
  * more [filename] - shows one screen's worth of the file at a time.
  * less [filename] - similar to more
  * head [filename] - Shows the first 10 lines of file, or use -n
  * tail [filename] - Shows the last 10 lines of file, or use -n
  * cat [filename] | more - works like more, cat concats 2 strings

### General/System commands

  * su [user] - changes the login to &#8216;user', or to the root if no &#8216;user' is given.
  * date - shows the system date
  * whoami - tells you who you're logged in as
  * uptime - how long the computer has been running, plus other details
  * w - shows who's logged on, what they're doing.
  * df - how much disk space is left.
  * du - disk usage by your login, it can also total up directories.
  * uname -mrs - userful info about the system
  * uname -a - all details about the system

### Desktop / X server + client

  * Switchdesk {manager - gnome, Enlightenment, etc} - Switches your desktop

### What's running

  * ps - what's running.
  * ps ax - shows all processes
  * top - sort of interactive version of ps.
  * kill [pid] - terminates the named process, which can be name or number or other options.
  * killall -HUP [command name] - kill a process, running the command specified, by name.
  * killall -9 [command] - similar to the above
  * xkill - kills a frozen application in X (gnome,kde etc. desktops), you just click on the frozen app.

### File system

  * ls -la - list all files/directories
  * dir - simple form of ls
  * cd [dir] - change directory
  * cd ~ - go back to the home directory
  * cdup - similar to using &#8220;cd ..&#8221;, go up one directory.
  * pwd - print which directory you're in.
  * ./[filename] - run the file if it's executable and in the current directory
  * rm [filename] - delete a file
  * rm -R [directory] - delete a directory
  * mv \[oldfilename\] \[newfilename\] - renames the file (or directory)
  * cp \[filename-source\] \[filename-destination\] - copy the file from one place to another
  * cp -R \[dir-source\] \[dir-destination\] - copy a directory an all its subdirectories
  * mkdir [name] - makes a directory.
  * cat [sourcefile] >> [destinationfile] - appends sourcefile to the end of destinationfile
  * df - how much disk space is available, more options available.

### Zipping/taring

  * tar -cvzf mytar.tar.gz sourcefilesordir - creates a new tar file, verbose options on, runs it through gnuzip,f is the filename
  * tar -xvf mytar.tar.gz destination - extracts a tar file (this example is compressed with gzip), verbosely, f is the filename
  * gzip fileordir - compresses a file with gzip.
  * gunzip file.gz - decompresses a file with gzip.

NB gzip only compresses files, it doesn't collect them into a single file like a tarball does.

### Searching

  * locate [filename] - searches the system using an indexed database of files. use updatedb to update the file database
  * locate [filename] | sort - sorts the files alphabetically
  * whereis [filename] - locates an application, such as &#8216;whereis bash'
  * find [filename] - searches the filesystem as with locate, but without a database so its slower.
  * find /directory -atime +30 -print - searches for files not used in the past 30 days.

### Setting up links

  * ln -s target linkname - creates a symbolic link, like a shortcut to the target directory or filename.
  * ln target linkname - creates the default hard link. Deleting this will delete the targetted file or directory.

### Network commands

  * dig domainname - retrieves information about a domain, such as name servers, mx records
  * whois domainname - whois info on a domain
  * finger user - gives info about a user, their group status, but can also be used over a network
  * netstat -ape - lots of info about whos connected to your machine, what processes are doing what with sockets

### Piping

Piping to another command is straight forward enough:

  * locate filename | grep /usr/local > searchresults.txt

This searches for filename, runs the results through grep to filter everything without /usr/local in it, and then outputs the results to searchresults.txt

**|** runs one application via another, and can be used multiple times e.g. cat /usr/group | more | grep root | sort   
**>** creates a new file if one doesn't already exist, overwrites the contents of the file if it does exist   
**>>** appends to the end of the file, and creates the file if one doesn't exist.   
**<** sends everything after this to the application, e.g. ./mysql -u bob -p databasename < mysqldump.sql 

### Permissions and directory listing format

  * groups [username] - shows what groups the user belongs to
  * id [username] - shows extended information about a user.
  * finger [user] - give details about a user.
  * passwd [user] - changes the password for a user, or without the user argument, changes your password.
  * chsh [user] - changes the shell for a user.
  * userdel [user] - removes a user from the system, use -r to remove their home directory too.
  * newgrp [group id] - log into a new group.
  * useradd -d /home/groupname -g groupname - add a new user with the d being the homedirectory, g the default group they belong to.
  * groupadd [groupname] - adds a group

Take a look at the users/groups on the system with:

  * cat /etc/passwd | sort
  * cat /etc/group | sort

The stuff below is in the man pages also.

The format of passwd is:

	username  
	password denoted by x (use cat /etc/shadow | sort to list the shadow password file)  
	uid - user identifier number  
	gid - group identifier number  
	misc information such as real name  
	users home directory  
	shell for the user

The format of group is: 

	name of group  
	password denoted by x (use cat /etc/gshadow | sort to list the shadow group file)  
	gid - group identifier number  
	list of additional users assigned to the group

Break down of permissions in a directory listing:

<pre>-rw-r--r-- 1 mainuser devel 9054 Dec 28 12:42 index.html</pre>

The first character indicates whether it is a directory or file (d for directory).   
After that, the next 3 (rw-) are owner permissions.   
The following 3 (r-) are group permissions   
The following 3(r-) are permissions for other users. 

After that reads the number of files inside the directory if it's a directory (which it isn't so it's 1) this can also be links to the file, the owner of the file, the group the file belongs to, size in bytes, date and time and then the filename.

### Chmod and Chown

Owner,group and other permissions can be r,w,x. Translated into their decimal equivalents: 

  * owner-read=400,write=200,execute=100
  * group-read=40,write=20,execute=10
  * other-read=4,write=2,execute=1

So add them up and you've got your user permissions for chmoding: 

  * chmod [mode] fileordirectory - changes the permissions on a file or directory. use -r to recursively change a whole directory and its sub directories. 

e.g chmod 755 myfile.txt - changes the permissions on the file to 755 which is : owner read,write,execute; group read,execute; other read,execute.

  * chown [user:group] fileordirectory - changes the user and group ownership of a file or directory. Use -R to recursively change a whole directory and its sub directories.
  * chgrp [group] fileordirectory - changes the groupownership of a file or directory. Use -R to recursively change a whole directory and its sub directories.

### MySQL

  * mysqldump - Dumps a table,database or all databases to a SQL file. Use the -opt argument for best results e.g.
  * mysqldump -u username -p -opt database > file.sql
  * mysql - The mySQL query manager. To import/export a database to or from a SQL try:
  * mysql -u username -p database < file*to*go_in.sql
  * mysql -u username -p database > file*to*go_to.sql

## Permissions calculator
<script>
function clearForm()
{
	var form = document.getElementById("unixcalculator");
	for (var i=0;i < form.elements.length;i++)
	{
		if (form.elements[i].type == "checkbox")
		{
			form.elements[i].checked = false;
		}
	}

	form.unixpermission.value = "";
}

function makePermissions()
{
	mode = 0;
	var form = document.getElementById("unixcalculator");
	for (var i=0;i < form.elements.length;i++)
	{
		if (form.elements[i].type == "checkbox")
		{
			if (form.elements[i].checked == true)
			{
				mode += parseInt(form.elements[i].value);
			}
		}
	}

	form.unixpermission.value = mode;
}

function reversePermissions()
{
	var form = document.getElementById("unixcalculator");
	var mode = parseInt(form.unixpermission.value);
	for (var i=0;i < form.elements.length;i++)
	{
		if (form.elements[i].type == "checkbox")
		{
			var val = parseInt(form.elements[i].value);
			if (mode === val)
			{
				form.elements[i].checked = true;
				return;
			}
		}
	}

	console.log("the mode is: " +mode);
	for (var i=0;i < form.elements.length;i++)
	{
		if (form.elements[i].type == "checkbox")
		{
			var val = parseInt(form.elements[i].value);
			var newMode = mode - val;
			console.log("new mode would be: " +newMode);

			else if (newMode > 0)
			{
				form.elements[i].checked = true;
				mode -= val;
			}
		}
	}
}
</script>
<form id="unixcalculator">
<table width="500" class="table table-bordered">
	<thead>
			<tr>
				<th>&nbsp;</th>
				<th>Read</th>
				<th>Write</th>
				<th>Execute</th>
			</tr>
	</thead>
	<tbody>
		<tr>
			<td>Owner</td>
			<td><input type="checkbox" name="a1" value="400" /></td>
			<td><input type="checkbox" name="a2" value="200" /></td>
			<td><input type="checkbox" name="a3" value="100" /></td>
		</tr>
		<tr>
			<td>Group</td>
			<td><input type="checkbox" name="b1" value="40" /></td>
			<td><input type="checkbox" name="b2" value="20" /></td>
			<td><input type="checkbox" name="b3" value="10" /></td>
		</tr>
		<tr>
			<td>Others</td>
			<td><input type="checkbox" name="c1" value="4" /></td>
			<td><input type="checkbox" name="c2" value="2" /></td>
			<td><input type="checkbox" name="c3" value="1" /></td>
		</tr>
		<tr>
			<td colspan="4" align="right">Mode&nbsp;<input type="text" name="unixpermission" id="unixpermission" /></td>
		</tr>
		<tr>
			<td colspan="4" style="text-align:right">
				<input type="button" class="btn btn-primary" name="Button" value="Clear" onclick="clearForm();" />
				<input type="button" class="btn btn-primary" name="Button" value="Calculate permissions" onclick="makePermissions();" />
				<input type="button" class="btn btn-primary" name="Button" value="Show permissions" onclick="reversePermissions();" />
			</td>
		</tr>
	</tbody>
</table>
</form>
