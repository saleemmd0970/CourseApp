#base image used from docker hub
FROM node:slim

# Set in what directory commands will run
WORKDIR /home/app

# Put all our code inside that directory that lives in the container
ADD . /home/app

# Install dependencies
#RUN \
#    npm install -g bower --allow-root && \
#    npm install -g gulp --allow-root && \
#    npm install --save --allow-root && \
#    bower install --save --allow-root

RUN \
    npm install -g gulp --allow-root && \
    npm install --save --allow-root

# Tell Docker we are going to use this port
EXPOSE 18080
# The command to run our app when the container is run
CMD ["gulp", "serve"]