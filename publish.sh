if [$# -ne]; then 
echo "You must include exactly one parameter"
echo "Please provide the docker hub repository this project should be published to."
exit 1
fi

#docker tag v1.2 $repo/webserver:latest
# docker tag $someTag registry.digitalocean.com/repo-name/image-name4

docker build -t $repo/ex05:latest -f Dockerfile .
docker push $repo/ex05:latest

# tp digital ocean
# docker push registry.digitalocean.com/web/web-server:latest
# or 
# docker build --push -t $rep/webserver -f Dockerfile 