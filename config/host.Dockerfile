FROM ruby:3.0.0

ENV RAILS_ENV production
RUN mkdir /finance
RUN bundle config mirror.https://rubygems.org https://gems.ruby-china.com
WORKDIR /finance
ADD Gemfile /finance
ADD Gemfile.lock /finance
ADD vendor/cache /finance/vendor/cache
RUN bundle config set --local without 'development test'
RUN bundle install --local

ADD finance-*.tar.gz ./
ENTRYPOINT bundle exec puma