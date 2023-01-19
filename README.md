# Usage Instructions

### Run Application using Docker Compose

```bash
docker-compose -f docker-compose.yaml up
```

### Run in Development Server

#### Install server node-modules

```
yarn install
```

#### Start server in development mode

```
yarn start
```

#### Install client node-modules

```
cd client
yarn install
```

#### Start client in development mode

```
yarn dev
```

#### Run tests

```
yarn test
```

#### Run Code Coverage

```
yarn coverage
```

### Environment Variables

```
PORT                               # Port Number
MONGO_URL                          # MongoDB Connection URL
CLOUDINARY_CLOUD_NAME              # Cloudinary Cloud Name
CLOUDINARY_API_KEY                 # Cloudinary Public API Key
CLOUDINARY_API_SECRET              # Cloudinary Secret Key
```
