[![Dependency Status](https://david-dm.org/dragonprojects/maxdome-chatbot.svg)](https://david-dm.org/dragonprojects/maxdome-chatbot)
[![devDependency Status](https://david-dm.org/dragonprojects/maxdome-chatbot/dev-status.svg)](https://david-dm.org/dragonprojects/maxdome-chatbot?type=dev)

# Commands

* mxd-info
* mxd-login
* mxd-logout
* mxd-search


# Platforms

## Console

Environment variables:

* HEIMDALL_APIKEY
* HEIMDALL_APPID
* PLATFORM=console
* REDIS_URL

## IRC

Process Type: worker

Environment variables:

* HEIMDALL_APIKEY
* HEIMDALL_APPID
* IRC_ADMIN_ID
* IRC_HOST
* IRC_NICK
* IRC_PASSWORD
* IRC_USERNAME
* PLATFORM=irc
* REDIS_URL

Commands:

* mxd-channels
* mxd-join
* mxd-part

## Slack

Process Type: web

Environment variables:

* HEIMDALL_APIKEY
* HEIMDALL_APPID
* PLATFORM=slack
* REDIS_URL
* PORT
