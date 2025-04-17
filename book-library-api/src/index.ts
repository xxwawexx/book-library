import buildServer from './utils/buildServer';

const app = buildServer();

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    
    console.log("🚀 Server ready at http://localhost:3000");
    console.log("Swagger at http://localhost:3000/docs");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();