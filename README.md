# prismic dev

Install prismic-cli

`npm install -global prismic-cli`

Login

`prismic login`



# nference-web

### How to deploy in production - initial deployment
1. Request access to `nference.com` machine with `sudo` access from [Url](https://cerebro.nferx.com/cerebro-app/home?tab_id=user_ssh)
2. Connect to the remote machine
   ```bash
   ssh username@nference.com
   ```
3. Clone the repository
   ```bash
   git clone https://github.com/lumenbiomics/nference-web.git
   ```
4. Install the dependenceis
   ```bash
   npm install
   ```
   Change the core-ui url in the package.json
5. Generate the build
   ```bash
   npm run build
   ```
6. Add the task in pm2
   ```bash
   pm2 start --name nference.com npm -- run start
   ```

### How to do regular deployments?
1. Connect to the remote machine
   ```bash
   ssh username@nference.com
   ```
2. Go to the repository location
   ```bash
   cd /opt/nferx/nference-web
   ```
3. Pull the changes from remote Git
   ```bash
   git pull origin main
   ```
4. Remove sitemap.xml file, it generates automatically when we generate the build
   ```bash
   rm public/sitemap.xml
   ```
5. Generate the build
   ```bash
   npm run build
   ```
6. Restart the pm2 server
   ```bash
   pm2 status
   pm2 restart <id>     // Eg: pm2 restart 0
   ```
7. Done

### How to configure prismic events to restart website automatically when the hook triggers in prismic.io?
1. Connect to the remote machine
2. Create python3 virtualenv
   ```bash
   sudo apt-get install python3.6-venv
   python3 -m venv <env-name>      // Eg: python3 -m venv my_env
   ```
3. Create a bash script
   ```bash
    touch execute.sh
   ```
4. Add the following content in it
   ```bash
   #!/bin/sh
   cd /opt/nferx/nference-web
   rm public/sitemap.xml
   npm run build
   pm2 restart 0
   ```
5. Activate the python virualenv
   ```bash
   source /path/to/<env-name>/bin/activate
   ```
6. Install flask module
   ```bash
   pip install flask
   ```
7. Create a python file
   ```bash
   touch reload_web.py
   ```
8. Add the following content in it
   ```python

   import os
   import time
   import json
   import subprocess

   from flask import Flask, request
   from subprocess import Popen

   SECRET_KEY = '<some-random-key>' // it should be same as `secret` in prismic webhook
   ERROR_MSG = 'Invalid secret key'
   app = Flask(__name__)
   @app.route('/', methods=['POST'])
   def rebuild_static_files():
       req_data = json.loads(request.data)
       sec_received = req_data.get('secret', '')
       if sec_received != SECRET_KEY:
           print(ERROR_MSG)
           return ERROR_MSG

       #time.sleep(60) # 1min
       Popen(['./execcute.sh'])
       return 'Build files are regenerated successfully'

   if __name__ == '__main__':
   app.run(debug=True, port=8981)
   ```
9. Run on screen or add a supervisor job
   ```bash
   python reload_web.py
   ```

### How to run the website on your dev server
1. Connect to your dev machine and clone the repo
2. cd nference-web && npm install
3. Update next.config.js
   - Comment out assetPrefix
   - Set basePath to `/` or `/nference_web`
4. Update src/Config.js
   - Set imagesUrl to your hostname. Eg: imagesUrl: http://baji-servers.nferx.com
5. Start the development server - `npm run dev`
6. Make sure to test with production mode before creating the pull request. To test the production mode
   ```bash
   npm run build
   npm run start
   ```
