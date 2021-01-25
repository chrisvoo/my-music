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
      autorestart: false, // done by nodemon
      watch: false,       // done by nodemon
      script: 'npm',
      args: 'run dev',
    }
  ],
};
