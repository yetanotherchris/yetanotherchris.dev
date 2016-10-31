---
---

[
	{% for post in site.posts %}{"value" : "{{ post.title | xml_escape }}", "data" : "{{ post.url }}"},{% endfor %}
	{ "value" : "", "data" : ""}
]
