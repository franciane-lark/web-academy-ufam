# 1. Baseado em Ubuntu conforme pedido
FROM ubuntu:24.04

# 2. Evita prompts interativos travando a instalação
ENV DEBIAN_FRONTEND=noninteractive

# 3. Atualiza o sistema e instala o NGINX
RUN apt-get update && apt-get install -y nginx && apt-get clean

# 4. Define o argumento a ser recebido no MOMENTO DO BUILD
ARG PORTA_ARG
ENV PORTA=${PORTA_ARG}

# 5. Modifica o arquivo de configuração do NGINX padrão para escutar na porta escolhida
RUN sed -i "s/listen 80 default_server;/listen ${PORTA} default_server;/g" /etc/nginx/sites-available/default

# 6. Mapeia/Expõe a porta no momento do build
EXPOSE ${PORTA}

# 7. Comando para manter o NGINX rodando em primeiro plano no container
CMD ["nginx", "-g", "daemon off;"]
