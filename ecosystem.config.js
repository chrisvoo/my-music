module.exports = {
  apps : [
    {
      name: 'frontend',
      cwd: './packages/frontend',
      instances: 1,
      autorestart: true,
      wait_ready: false,
      watch: false, // React dev server will take care
      script: 'npm',
      args: 'start',
    }, 
    {
      name: 'backend',
      cwd: './packages/backend',
      instances: 1,
      autorestart: false, // watch specified by nest cli
      watch: false,
      script: 'npm',
      args: 'start',
    }
  ],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
