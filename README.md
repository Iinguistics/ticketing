E-Commerce app to buy & sell event tickets.

To run the app:

- cd into ea srv & run npm i
- skaffold dev (can install skaffold here: https://skaffold.dev)
- will need to add your own cluster env variables for:
- STRIPE_KEY, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY
- kubectl create secret generic {secretKeyRef name} --from-literal={name}={value}

The Ingress host is set to ticketing.dev, update this to your desired host in your etc/hosts file.
Will need to add if not already present: 127.0.0.1 kubernetes.docker.internal

Install Ingress-Nginx: https://kubernetes.github.io/ingress-nginx/deploy/

To run tests:

- cd into a srv & run npm test

![diagram of architecture](https://i.ibb.co/Km0nLJt/Screen-Shot-2024-05-01-at-2-36-58-PM.png)
