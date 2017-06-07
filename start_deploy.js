let argv = require('yargs').argv;
let shell = require('shelljs');

//How to use this script:
//$ npm run deploy -- --remote heroku-remote-name --branch local-branch-name [optional force flag: -f OR --force]
//Alternative syntax:
//$ node ./start_deploy.js --remote heroku-remote-name --branch local-branch-name [optional force flag: -f OR --force]

//Note: If you use ctrl+c in the terminal while npm shrinkwrap is running the process likely will not end properly(after that step you can ctrl+c)

process.on('SIGINT', function() {
    console.log('\nDeleting local npm-shrinkwrap.json...\n');
    shell.exec(`rm -rf ./npm-shrinkwrap.json`);
    shell.exec(`git add .;git commit -m"deleted npm-shrinkwrap.json";`, {silent: true});
    shell.exit(0);
    process.exit(0);
});

process.on('SIGTERM', function() {
    console.log('\nDeleting local npm-shrinkwrap.json...\n');
    shell.exec(`rm -rf ./npm-shrinkwrap.json`);
    shell.exec(`git add .;git commit -m"deleted npm-shrinkwrap.json";`, {silent: true});
    shell.exit(0);
    process.exit(0);
});

let uncommitedChanges = shell.exec('git diff', {silent: true}).stdout;

if(uncommitedChanges && uncommitedChanges.length) {
    console.log('There are uncommitted changes, commit them before pushing to Heroku.');
} else {
    if (typeof argv.remote == 'string' && typeof argv.branch == 'string' && !argv.force && !argv.f) {
        console.log('Running npm shrinkwrap...\n');
        console.log('Don\'t ctrl+c while shrinkwrap is running or process won\'t end properly...\n');
        shell.exec(`npm shrinkwrap`);
        shell.exec(`git add . -f;git commit -m"added npm-shrinkwrap.json";`, {silent: true});

        console.log('\nctrl+c is now safe...\n');

        console.log(`\nPushing to Heroku using the following command...\n`);
        console.log(`\ngit push ${argv.remote} ${argv.branch}:master\n`);
        shell.exec(`git push ${argv.remote} ${argv.branch}:master`);

        console.log('\nDeleting local npm-shrinkwrap.json...\n');
        shell.exec(`rm -rf ./npm-shrinkwrap.json`);
        shell.exec(`git add .;git commit -m"deleted npm-shrinkwrap.json";`, {silent: true});
        shell.exit(0);
    } else if(typeof argv.remote == 'string' && typeof argv.branch == 'string' && (argv.force || argv.f)) {
        console.log('Running npm shrinkwrap...\n');
        console.log('Don\'t ctrl+c while shrinkwrap is running or process won\'t end properly...\n');
        shell.exec(`npm shrinkwrap`);
        shell.exec(`git add . -f;git commit -m"added npm-shrinkwrap.json";`, {silent: true});

        console.log('\nctrl+c is now safe...\n');

        console.log(`\nPushing to Heroku using the following command...\n`);
        console.log(`\ngit push ${argv.remote} ${argv.branch}:master -f\n`);
        shell.exec(`git push ${argv.remote} ${argv.branch}:master -f`);

        console.log('\nDeleting local npm-shrinkwrap.json...\n');
        shell.exec(`rm -rf ./npm-shrinkwrap.json`);
        shell.exec(`git add .;git commit -m"deleted npm-shrinkwrap.json";`, {silent: true});
        shell.exit(0);
    } else {
        console.log(`Deploy script failed, retry with this formatting: \n
                    $ npm run deploy -- --remote heroku_remote_name --branch branch_name_to_deploy [optional force flag: -f OR --force] \n
                    Alternative syntax: \n
                    $ node ./start_deploy.js --remote heroku-remote-name --branch local-branch-name [optional force flag: -f OR --force]`);

        shell.exec(`rm -rf ./npm-shrinkwrap.json`);
        shell.exec(`git add .;git commit -m"deleted npm-shrinkwrap.json";`, {silent: true});             
        shell.exit(0);
    }

}

process.exit(0);       
