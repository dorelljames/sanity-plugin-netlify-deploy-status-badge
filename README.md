# sanity-plugin-netlify-deploy-status-badge

> This is a Sanity Studio v3 plugin. For the v2 version, please refer to the [legacy-v2](https://github.com/dorelljames/sanity-plugin-netlify-deploy-status-badge/tree/legacy-v2) branch.

Display Netlify's status badge in Sanity Studio and your site's recent deploys. Plus, trigger a new build if you want to!

![](https://raw.githubusercontent.com/dorelljames/sanity-plugin-netlify-deploy-status-badge/master/src/assets/preview-full.png)

## Installation

```
sanity install netlify-deploy-status-badge
```

or

```bash
npm install --save sanity-plugin-netlify-deploy-status-badge

```

or

```bash
yarn add sanity-plugin-netlify-deploy-status-badge
```

## Configuration

The plugin can be configured through `sanity.config.ts`:

```ts
import { netlifyDeployStatusBadge } from "sanity-plugin-netlify-deploy-status-badge";

export default defineConfig({
  plugins: [
    netlifyDeployStatusBadge({
      apiId: "YOUR_NETLIFY_API_OR_SITE_ID",
    }),
  ],
});
```

or with authentication via OAuth.

```ts
import { netlifyDeployStatusBadge } from "sanity-plugin-netlify-deploy-status-badge";

export default defineConfig({
  plugins: [
    netlifyDeployStatusBadge({
      apiId: "YOUR_NETLIFY_API_OR_SITE_ID",
      auth: {
        oauthClientId: "YOUR_NETLIFY_OAUTH_APP_CLIENT_ID",
      },
    }),
  ],
});
```

### Authentication

By default, accessing deploy logs via the API does not require authentication. However, if you set your site's deploy logs to private, the plugin needs to be setup with OAuth for you to authenticate and pull in data to show site deploys. Being authenticated also enables you to trigger a new build on your site.

Authentication can be done in two ways: OAuth or personal tokens. Support for the latter will be implemented later as I'll need to spend more time integrating it with [sanity-studio-secrets](https://github.com/sanity-io/sanity-studio-secrets).

#### Which one to choose?

It might not be relevant as of now as personal tokens has been not been implemented but with personal tokens, anyone who has access to your Sanity Studio can do administrative actions on your behalf such as trigger a new build, etc. while with OAuth, anyone who has access to your Sanity Studio will still need to login and authorize with their Netlify account to do the former actions mentioned.

#### How to configure?

To configure OAuth, go to your [User Settings > Applications > OAuth](https://app.netlify.com/user/applications). Click `New OAuth application`. Fill out the following:

1. Application Name - `Sanity Plugin Netlify Deploy Status Badge` or any name you prefer.
2. Redirect URI - `<YOUR_SANITY_STUDIO_URL>/netlify-deploy-status-badge` (eg: https://dorelljames.sanity.studio/netlify-deploy-status-badge)
3. Click **Save** and copy generated **Client ID**.
4. Open `sanity.config.ts` or (.js) and add the following like this below:

```js
netlifyDeployStatusBadge({
  apiId: "537d0d4d-3443-4cf7-b838-fe0478131e18",
  auth: {
    oauthClientId: "<COPIED_OAUTH_CLIENT_ID>",
  },
});
```

5. Voila! Done.

## Todos

- [ ] Support for using personal tokens to authenticate.

## License

MIT © Dorell James
See LICENSE

## License

[MIT](LICENSE) © Dorell James

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](https://github.com/dorelljames/sanity-plugin-netlify-deploy-status-badge/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
