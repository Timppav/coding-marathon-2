# Self Assessment

We used the Live Share extension for VSCode to work together.

Initially, our frontend couldn't reach the backend. This was because of the inclusion of /api/ in the routes, which was removed on the frontend side through the vite.config.js file.
The following line of code was removed:

```
rewrite: (path) => path.replace(/^\/api/, '')
```

Our frontend uses React Hook Form to manage form state and validation on the Authentication Page, including the Login and Register pages.

```
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address',
          },
        }}
        render={({ field }) => (
          <div>
            <InputField {...field} type="text" label="Email address or user name" placeholder="Enter your email" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
        )}
      />
      ...
      </form>
```