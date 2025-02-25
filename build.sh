#builds docker project
docker build -t ex05 . 
#runs docker project 
docker run -d -p 8080:80 ex05  