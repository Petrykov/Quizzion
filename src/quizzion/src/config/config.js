const developmentConfig = {
  frontendPath: 'http://192.168.2.15:8080/#',
  backendPath: 'http://192.168.2.15:3000'
};

const productionConfig = {
  frontendPath: 'http://quizzion-deploy.s3-website-us-east-1.amazonaws.com/#',
  backendPath: 'http://ec2-3-95-32-43.compute-1.amazonaws.com:3000'
};

module.exports = process.env.DEV ? developmentConfig : productionConfig;
