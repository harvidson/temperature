# G40-react-express-boilerplate

## To develop

In two separate windows, run the following commands

```shell
yarn start
```

```shell
yarn dev:wds
```


## To deploy to heroku

After creating the heroku app and adding the remote to your repository, run the following command.

```shell
heroku config:set NPM_CONFIG_PRODUCTION=false
```

This is needed so that heroku downloads all the development dependencies to build the project.

After the configuration has been set, you can deploy using the following command.

```shell
git push heroku master
```


## Credits

This boiler plate was inspired by [js-stack-from-scratch](https://github.com/verekia/js-stack-from-scratch)
