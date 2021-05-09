# sanity-plugin-netlify-deploy-status-badge

Display Netlify's status badge in Sanity Studio and recent deploy logs.

![](https://raw.githubusercontent.com/dorelljames/sanity-plugin-netlify-deploy-status-badge/master/src/assets/preview-full.png)

## Installation

```
sanity install netlify-deploy-status-badge
```

## Configuration

The plugin can be configured through `<your-studio-folder>/config/netlify-deploy-status-badge.json`:

```json
{
  "apiId": "<YOUR-NETLIFY-API-OR-SITE-ID-HERE>"
}
```

### Authentication

By default, Netlify opensource projects are set to public and API access to the site and deploy logs don't need authentication. But still you want to authenticate for you to be able to trigger a new build on your site. There are two ways to authenticate, OAuth or personal tokens.

#### Which one to choose?

With personal tokens, anyone who has access to your Sanity Studio can do administrative actions on your behalf such as trigger a new build, etc. while with OAuth2, anyone who has access to your Sanity Studio will need to login and authorize with their Netlify account to do the former actions mentioned.

#### How to configure?

To configure OAuth2, go to your [User Settings > Applications > OAuth](https://app.netlify.com/user/applications). Click `New OAuth application`. Fill out the following:

1. Application Name - `Sanity Plugin Netlify Deploy Status Badge` or any name you prefer.
2. Redirect URI - `<YOUR_SANITY_STUDIO_URL>/netlify-deploy-status-badge` (eg: https://dorelljames.sanity.studio/netlify-status-badge)
3. Click **Save** and copy generated **Client ID**.
4. Open `netlify-deploy-status-badge.json` and add the following like this below:

```json
{
  "apiId": "537d0d4d-3443-4cf7-b838-fe0478131e18",
  "auth": {
    "oauthClientId": "<COPIED_OAUTH_CLIENT_ID>"
  }
}
```

5. Voila! Done.

## Todos

[ ] Support for using personal tokens to authenticate.

## License

MIT © Dorell James
See LICENSE
