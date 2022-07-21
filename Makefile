.PHONY: update

update:
	@docker run -it --rm -v `pwd`:/var/www/html composer \
		bash -c "composer create-project --prefer-dist laravel/laravel . && \
		mv README.md README.LARAVEL.md && \
		cp -aT . /var/www/html"
