### Webpack 2 Example Setup

* If using express the static files need to be loaded differently based on if you're in development or production

* Development

```
 if (process.env.NODE_ENV === 'development') {
        //run code from source
        app.use(express.static(path.resolve('./client')));
    }
```

* Production / Staging

```
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    //run minified code from dist
    app.use(express.static(path.resolve('./bundle'), {setHeaders}));
}
```