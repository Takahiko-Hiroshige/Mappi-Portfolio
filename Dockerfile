# NODE BUILDER
FROM node as nodebuilder
# Dependency
WORKDIR /var/www/html
COPY package*.json ./
RUN npm install

# Application
COPY webpack.mix.js .
COPY artisan .
COPY resources resources
RUN npm run production

# COMPOSER BUILDER
FROM composer as composerbuilder
WORKDIR /var/www/html
COPY composer.* ./
RUN composer install --no-dev --no-scripts --no-progress --no-suggest --prefer-dist --no-autoloader -q
# Generate autoloader
COPY . .
RUN composer dumpautoload -q

# PUBLISH
FROM php:7-fpm
WORKDIR /var/www/html

# Configure apt and install packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
    && apt-get -y install git openssh-client less iproute2 procps iproute2 lsb-release \
    # For php:7.4
    && apt-get -y install libonig-dev \
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install opcache pdo_mysql bcmath \
    && yes | pecl install apcu \
    && docker-php-ext-enable apcu

# php-fpm.sock
RUN mkdir -p /var/run/php-fpm
COPY .devcontainer/docker/php/php-fpm.d/zzz-www.conf /usr/local/etc/php-fpm.d/zzz-www.conf

COPY --from=composerbuilder /var/www/html /var/www/html
COPY --from=nodebuilder /var/www/html/public /var/www/html/public

RUN chmod -R 777 storage \
    #  Generate cache
    && php artisan config:cache \
    && php artisan view:cache
    # && php artisan route:cache
