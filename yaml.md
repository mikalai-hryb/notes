# YAML

## Best practices

* use `---` as a signal the start of document
* use `...` as a signal the end of the document
* use only `true` for truly value
* use only `false` for falsy value
* use indents and dashes for sequences/lists

```yaml
tasks:
    - name: Ensure nginx is installed
    package: name=nginx update_cache=yes
    - name: Restart nginx
    service: name=nginx state=restarted
```

* you can use abbreviated form for lists and mappings/dictionaries

```yaml
martin: {name: Martin D'vloper, job: Developer, skill: Elite}
fruits: ['Apple', Orange, 'Strawberry', 'Mango', '12']
```
