# Self Assessment

Initially, our frontend couldn't reach the backend. This was because of the inclusion of /api/ in the routes, which was removed on the frontend side through the vite.config.js file.
The following line of code was removed:

```
rewrite: (path) => path.replace(/^\/api/, '')
```

# 