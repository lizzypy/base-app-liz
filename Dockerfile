FROM ruby:3.2.0

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
 apt-get install -y nodejs postgresql-client

RUN mkdir /myapp
WORKDIR /myapp
# do you need these steps if you have line 7?
COPY web/Gemfile /myapp/Gemfile
COPY web/Gemfile.lock /myapp/Gemfile.lock
RUN bundle install

COPY . /myapp

# Building the frontend assets from the frontend directory
# the project.json specifies a build path so they will be built into the /public/static directory and rails can serve them
#WORKDIR /myapp/frontend
#RUN npm install && npm run build

EXPOSE 3000
ENTRYPOINT ["./start.sh"]