# Maintaining a custom Min fork

This repository is an Electron application, not a Chromium checkout. Customize the browser in the JavaScript, CSS, HTML, localization, icon, and `main/` files in this repository. Chromium is supplied by the Electron version in `package.json`.

## First-time fork setup

1. Change `name`, `productName`, `author`, `description`, `version`, and `repository.url` in `package.json`.
2. Replace the icons under `icons/`.
3. Update the product name and archive names in `scripts/buildWindows.js`, `scripts/buildDebian.js`, `scripts/buildRedhat.js`, and `scripts/buildAppImage.js` if the new product should not be called Min.
4. Update the README, license attribution, and application identifiers before distributing binaries.
5. Add the upstream repository locally:

   ```sh
   git remote add upstream https://github.com/minbrowser/min.git
   ```

6. Install dependencies and run the development browser:

   ```sh
   npm install
   npm run start
   ```

## Updates

There are two separate update streams:

- **Min application updates:** the `Sync upstream Min` workflow opens a pull request from `minbrowser/min` every Monday. Review conflicts and your customizations before merging.
- **Chromium/runtime updates:** Electron updates are proposed by Dependabot through `.github/dependabot.yml`. Electron versions bundle Chromium; there is no separate Chromium package to pull into this app.

Review every Electron update with `npm run build`. The repository's existing `npm test` command currently reports unrelated pre-existing lint errors, so fix those separately before making it a required CI gate. Major Electron upgrades can require changes to Chromium permissions, webviews, preload code, native modules, or packaging.

For a manual upstream sync:

```sh
git fetch upstream master
git switch -c sync-upstream-$(date +%Y%m%d)
git merge --no-edit upstream/master
```

Resolve conflicts, run the checks, and open a pull request instead of merging directly to `master`.

## GitHub releases

The existing `build-packages.yml` workflow remains available for manual artifact builds. To publish a release, update `version` in `package.json`, merge the change, and push a tag:

```sh
git tag v1.0.0
git push origin v1.0.0
```

`release.yml` builds Linux, Windows, and macOS packages in parallel and attaches them to the GitHub release. Configure repository Actions permissions to allow workflows to create releases, and do not put signing certificates or other secrets in the repository.
