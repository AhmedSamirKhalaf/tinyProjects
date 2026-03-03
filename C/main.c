#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8000

int main(int argc, char *argv[])
{
  int socktfd , newfd;
  struct sockaddr_in server_addr , client_addr;
  socklen_t addr_size;
  char* msg = "HTTP/1.1 200 OK\r\n"
        "Content-Type: text/html\r\n"
        "Content-Length: 20\r\n"
        "\r\n"
        "<h1>this a conetent from the server ya abo gors </h1>";

  socktfd = socket(AF_INET , SOCK_STREAM , 0);
  if(socktfd == -1){
    perror("CREATION");
    exit(EXIT_FAILURE);
  }

  server_addr.sin_family = AF_INET;
  server_addr.sin_addr.s_addr = INADDR_ANY;
  server_addr.sin_port = htons(PORT);
  memset(server_addr.sin_zero,0,sizeof(server_addr.sin_zero));
  if(bind(socktfd , (struct sockaddr*)&server_addr , sizeof(server_addr)) == -1){
    perror("BIND");
    close(socktfd);
    exit(EXIT_FAILURE);
  }
  
  if(listen(socktfd,5) == -1){
    perror("listen");
    exit(EXIT_FAILURE);
  }

  printf("Server is listing on port : %d\n",PORT);

  addr_size = sizeof(client_addr);
  newfd = accept(socktfd , (struct sockaddr *)&client_addr , &addr_size);
  if(newfd == -1){
    perror("ACCEPT");
    exit(1);
  }

  printf("Client Connected\n");

  send(newfd , msg , strlen(msg) , 0);

  close(newfd);
  close(socktfd);

  printf("Message sent \n");

  return EXIT_SUCCESS;
}
