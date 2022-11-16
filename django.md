`Manager` is the interface through which database query operations are provided to Django models. Each model has at least one `Manager`, and it’s called `objects` by default.

`QuerySet` represents a collection of objects from your database. It can have zero, one or many filters. Filters narrow down the query results based on the given parameters. In SQL terms, a QuerySet equates to a `SELECT` statement, and a filter is a limiting clause such as `WHERE` or `LIMIT`.
`QuerySet`s are lazy, they aren’t fetched from the database until you "ask" for them.

Python’s array-slicing syntax limits the `QuerySet`
```
Entry.objects.all()[:5] # LIMIT 5
```
```
Entry.objects.all()[5:10] # OFFSET 5 LIMIT 5
```

*step* parameter of Python slice syntax evaluates the query, for instance 
```
Entry.objects.all()[:10:2]
```

[Field lookups](https://docs.djangoproject.com/en/4.0/ref/models/querysets/#field-lookups)