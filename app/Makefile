
# NOTE: 誤操作防止のためtarget指定なしの場合はエラー扱いにする
all:
	@echo Please specify the target. >&2
	@exit 1

# NOTE: openapi.ymlはapiサーバーが公開しているものを利用する。
#       コンテナ内部からlocalhost（ホスト上の）へ通信はできない。
#       そのためhost.docker.internalを利用して通信する。
#       開発環境のapiサーバーはlocalhost:8080で起動するため。
gen:
	docker run \
		--rm \
		-v ${PWD}:/local/src \
		openapitools/openapi-generator-cli \
		generate \
			-i http://host.docker.internal:8080/openapi.yaml \
			-g typescript-axios \
			-o /local/src/src/openapi \
