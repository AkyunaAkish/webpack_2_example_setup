# this script copies the env variables from one heroku app to another
# if you want the apps to use different databases, don't use this script because it does overwrite database env variables

# how to use in terminal:
# $ bash copy_heroku_env_vars.sh sourceAppName targetAppName
set -e

sourceApp="$1"
targetApp="$2"

while read key value; do
  key=${key%%:}
  echo "Setting $key=$value"
  heroku config:set "$key=$value" --app "$targetApp"
done  < <(heroku config --app "$sourceApp" | sed -e '1d')