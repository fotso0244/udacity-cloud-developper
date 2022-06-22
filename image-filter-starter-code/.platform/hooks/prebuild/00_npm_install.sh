#!/bin/bash
echo 'export JWT_SECRET=helloworld' >> ~/.bash_profile
cd /var/app/staging
sudo -u webapp npm install sharp