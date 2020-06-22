const developmentConfig = {
  frontendPath: 'http://localhost:8080/#',
  backendPath: 'http://localhost:3000/api'
};

const productionConfig = {
  frontendPath: 'http://quizzion-deploy.s3-website-us-east-1.amazonaws.com/#',
  backendPath: 'http://ec2-3-95-32-43.compute-1.amazonaws.com:3000/api'
};

module.exports = process.env.DEV ? developmentConfig : productionConfig;
