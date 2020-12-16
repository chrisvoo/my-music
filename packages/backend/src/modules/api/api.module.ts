import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: [join(process.cwd(), './src/modules/api/graphql/*.graphql')],
      playground: true,
      debug: true,
      definitions: {
        path: join(process.cwd(), './src/modules/api/graphql/graphql.ts'),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
