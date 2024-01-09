import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Streamer API')
  .setDescription('Twitch Streamer API')
  .setVersion('1.0')
  .addBearerAuth()
  .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
  .build();

const options: SwaggerCustomOptions = {
  explorer: true,
  swaggerOptions: {
    docExpansion: 'list',
    deepLinking: true,
    filter: true,
    displayOperationId: true,
    displayRequestDuration: true,
    showExtensions: true,
    syntaxHighlight: true,
    requestSnippetsEnabled: true,
    useUnsafeMarkdown: true,
  },
};

export { config, options };
